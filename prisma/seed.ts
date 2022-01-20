import { prisma } from "../src/shared/infra/database"

async function seed() {
    console.log('running seed...')
    await prisma.paymentTypes.createMany({
        data: [
            {type: 'BOLETO'},
            {type: 'DÉBITO'},
            {type: 'CRÉDITO'},
            {type: 'PIX'},
            {type: 'DINHEIRO'}
        ]
    })
}

seed()
