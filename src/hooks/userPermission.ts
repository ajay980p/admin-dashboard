import { User } from "../store"

export const userPermission = () => {

    const allowedRoles = ['Admin', 'Manager']

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