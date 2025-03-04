import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const postImages = {
      playstation:
        "https://i.ibb.co/qVVD9FQ/mario-kart-9-speculation-v0-ao5fo37keede1.webp",
      nintendo: "https://i.ibb.co/Xf6L0kCN/valorant.webp",
      pc: "https://i.ibb.co/xSLvbNBW/gta6-01-900x503.webp",
      xbox: "https://i.ibb.co/HDNMfKS8/halo.webp",
    };

    const categoryImages = {
      playstation: "https://i.ibb.co/5WdVfzSK/icons8-playstation-50.png",
      nintendo: "https://i.ibb.co/tt0TptL/icons8-nintendo-switch-50.png",
      xbox: "https://i.ibb.co/pjkwsJy5/icons8-xbox-50.png",
      pc: "https://i.ibb.co/sp6sBzFK/icons8-pc-50.png",
    };

    const categories = [
      { name: "PlayStation", imageUrl: categoryImages["playstation"] },
      { name: "Nintendo", imageUrl: categoryImages["nintendo"] },
      { name: "Xbox", imageUrl: categoryImages["xbox"] },
      { name: "PC", imageUrl: categoryImages["pc"] },
    ];

    const user = await prisma.user.create({
      data: {
        name: "Usuário teste",
        email: "ficticio@example.com",
      },
    });

    for (const category of categories) {
      await prisma.category.create({
        data: {
          name: category.name,
          description: `${category.name} related news and posts`,
          imageUrl: category.imageUrl,
        },
      });
    }

    const posts = [
      {
        title: "New Mario Kart Speculation",
        content:
          "Exciting rumors and speculations about the next Mario Kart game.",
        category: "Nintendo",
        imageUrl: postImages["nintendo"],
      },
      {
        title: "Valorant: Latest Updates",
        content: "New updates and changes in the world of Valorant.",
        category: "PC",
        imageUrl: postImages["pc"],
      },
      {
        title: "GTA 6: Everything We Know",
        content: "Details and news about GTA 6 for PlayStation and Xbox.",
        category: "PlayStation",
        imageUrl: postImages["playstation"],
      },
      {
        title: "Halo Infinite News",
        content: "Latest updates on Halo Infinite for Xbox players.",
        category: "Xbox",
        imageUrl: postImages["xbox"],
      },
    ];

    for (const post of posts) {
      const category = await prisma.category.findUnique({
        where: { name: post.category },
      });

      if (category) {
        await prisma.post.create({
          data: {
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
            categoryId: category.id,
            authorId: user.id,
          },
        });
      }
    }

    console.log("Banco de dados populado com sucesso!");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as categorias e posts:", error);
  }
}

seedDatabase();
