import { User } from "../utils/store"

export const userPermission = () => {

    const allowedRoles = ['admin', 'manager']

    const hasPermission = (user: User | null) => {

        if (user) {
            return allowedRoles.includes(user.role)
        }
        return false;
    }

    return {
        isAllowed: hasPermission
    }
}