import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ["query"]});  // you can also watch the queries running behind the prisma 
// npx prisma generate   // generate all the related prisma code and suggested snippet for doing the queries

async function main(){
    
    // await prisma.user.deleteMany();
    
    // const user = await prisma.user.create({
    //     data: {
    //         name: "Umer",
    //         email: "test@gmail.com",
    //         age: 20,
    //         userPreference: {
    //             create: {
    //                 emailUpdates: true
    //             }
    //         }
    //     },
    //     // include: {
    //     //     userPreference: true
    //     // },
    //     select: {
    //         name: true,
    //         userPreference: {select: {id: true}}
    //     }
    // });
    const user = await prisma.user.findMany({
        where: {
            AND: [{age: {gte: 18}},
                {email: {
                    contains: "@gmail.com",
                    // endsWith: ".com"
                    // startsWith: "umer"
                }},
                {userPreference: {
                    emailUpdates: true
                }}
            ]
        },
        orderBy: {
            age: "desc"
        },
        take: 2,    // Pagination return 2
        skip: 1   // skip the first user 
    });
    
    // const users = await prisma.user.createMany({
    //     data: [
    //         {
    //             name: "Saad",
    //             email: "umer@gmail.com",
    //             age: 20,   
    //         },
    //         {
    //             name: "Hasan",
    //             email: "hasan@gmail.com",
    //             age: 21,
    //         }
    //     ]
    // })

    // console.log(users);   // {count: 2}
    
    
//     const user = await prisma.user.findUnique({
//         where: {
//             name_age: {
//                 age: 21,
//                 name: "Hasan"
//             }
//         }
//     })


// const user = await prisma.user.findFirst({
//     where: {
//         name: "Saad"
//     }
// })
console.log(user);
}


main()
.catch((e) => {
    console.error(e.message);
}).finally(async () => {
    await prisma.$disconnect()
})


// .every()
// .some()
// .none()