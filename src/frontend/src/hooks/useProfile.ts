import { createActor } from "@/backend";
import type { UserProfile as BackendUserProfile } from "@/backend.d";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

type ActorWithProfile = {
  getCallerUserProfile?: () => Promise<BackendUserProfile | null>;
  saveCallerUserProfile?: (
    name: string,
    email: string,
  ) => Promise<BackendUserProfile>;
  updateUserProfile?: (
    name: string,
    email: string,
  ) => Promise<BackendUserProfile | null>;
  getAllUsers?: () => Promise<
    Array<{ principalId: string; profile: BackendUserProfile }>
  >;
  deleteUserProfile?: (principalText: string) => Promise<void>;
};

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<BackendUserProfile | null>({
    queryKey: ["profile", "me"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return (
          (await (
            actor as unknown as ActorWithProfile
          ).getCallerUserProfile?.()) ?? null
        );
      } catch {
        return null;
      }
    },
    enabled: isAuthenticated && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      try {
        const updated = await (
          actor as unknown as ActorWithProfile
        ).updateUserProfile?.(name, email);
        if (updated) return updated;
      } catch {
        // fall through to save
      }
      const saved = await (
        actor as unknown as ActorWithProfile
      ).saveCallerUserProfile?.(name, email);
      if (!saved) throw new Error("Failed to save profile");
      return saved;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

// ─── Admin: All Users ─────────────────────────────────────────────────────────

export function useAllUsers() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();

  return useQuery<Array<{ principalId: string; profile: BackendUserProfile }>>({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return (
          (await (actor as unknown as ActorWithProfile).getAllUsers?.()) ?? []
        );
      } catch {
        return [];
      }
    },
    enabled: isAuthenticated && !isFetching,
  });
}

export function useUpdateAdminUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await (
        actor as unknown as ActorWithProfile
      ).updateUserProfile?.(name, email);
      if (result === undefined) throw new Error("Failed to update profile");
      return result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useDeleteUserProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (principalText: string) => {
      if (!actor) throw new Error("Not connected");
      await (actor as unknown as ActorWithProfile).deleteUserProfile?.(
        principalText,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}
