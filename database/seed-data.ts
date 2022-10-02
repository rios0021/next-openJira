interface SeedData{
    entries: SeedEntry[];
}

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number;
}

export const seedData = {
    entries:[
        {
            description: 'PENDING ;ijdfa ;alkjdsf ;ljdsfasdfiuh',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'IN PROGRESS asdfkajsddfasd dfkgkgkgkgkgkgkgkgkgg gka ;alkjdsf ;ljdsfasdfiuh',
            status: 'in-progress',
            createdAt: Date.now()-200000
        },
        {
            description: 'FINISHED sdfkajsdfoa;ijdfa ;alkjdsf ;ljdsfasdfiuh',
            status: 'finished',
            createdAt: Date.now()-100000
        }
    ]
}