import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
async function main() {
  const agendamento = await prisma.agendamento.create({
    data: {
      title: "Quero fazer café",
      dataInicial: new Date(),
      dataFinal: new Date(),
    },
  })
  console.log(agendamento)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })