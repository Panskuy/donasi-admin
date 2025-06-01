export async function POST(req) {
  try {
    const { title, description, amount, location, kategori, imageUrl } =
      await req.json();

    const result = await prisma.sumbangan.create({
      data: {
        title,
        description,
        amount,
        location,
        kategori,
        imageUrl, // simpan URL gambar di sini
      },
    });

    return NextResponse.json({ message: "Berhasil ditambahkan", data: result });
  } catch (error) {
    console.error("Gagal tambah donasi:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan donasi" },
      { status: 500 }
    );
  }
}
