import { usePermissionStore } from "@/store";

export default function useAuthorizer() {
  const permissionStore = usePermissionStore();

  return value => {
    const permissions = permissionStore.routers;
    const predicate = permission => {
      return Object.prototype.toString.call(value) === "[object String]" ? value === permission : value.includes(permission);
    };

    return permissions.some(predicate);
  };
};