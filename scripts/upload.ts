import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function upload() {
  try {
    // const a = await prisma.generatedImg
    // const imgs = images.slice(-3) //?
    // const imgs = usr[0]!.generatedImgs.slice(0, 12);
    // console.log(imgs);
    
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: 'imgs[0]' })
    });
    console.log(res);
    

    // for (const img of imgs) {
    //   const res = await fetch('http://localhost:3000/api/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ url: img })
    // });

    //   console.log({resKev: res});
    // }

  
  } catch (err) {
    console.log(err);    
    await prisma.$disconnect();
    process.exit(1)
  } finally {
    await prisma.$disconnect();
  }
}

upload()
  .then(console.log)
  .catch(console.log)
  .finally(console.log)