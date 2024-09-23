interface Role {
    name: string;
}

interface SeedData {
    roles: Role[];
    users: [];
}

export const initialData: SeedData = {

    roles: [
        { name: 'root' },
        { name: 'admin' },
        { name: 'guest' },
        { name: 'user' },
        { name: 'client' },
    ],

    users: []
    
}