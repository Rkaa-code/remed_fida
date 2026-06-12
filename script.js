let kategoriAktif = "Semua";

const container = document.getElementById("produk-container");
const searchInput = document.getElementById("search");

// Render Produk
function renderProduk(data) {

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center text-gray-500">
        Produk tidak ditemukan
      </div>
    `;
    return;
  }

  data.forEach(item => {

    const status =
      item.stok > 0
        ? `<span class="text-green-600 font-bold">
            Stok: ${item.stok}
          </span>`
        : `<span class="text-red-600 font-bold">
            Pre-Order / Stok Habis
          </span>`;

    container.innerHTML += `
      <div class="bg-white shadow-lg rounded-xl p-5">

        <h3 class="font-bold text-xl mb-2">
          ${item.nama_furnitur}
        </h3>

        <p>
          Bahan Kayu:
          <b>${item.bahan_kayu}</b>
        </p>

        <p>
          Kategori:
          ${item.kategori_ruangan}
        </p>

        <p class="text-amber-700 font-bold my-2">
          Rp ${item.harga.toLocaleString("id-ID")}
        </p>

        <p>${status}</p>

        <button
          onclick="pesanProduk(${item.id})"
          class="
          mt-3
          bg-amber-700
          text-white
          px-4
          py-2
          rounded
          hover:bg-amber-900
          "
          ${item.stok === 0 ? "disabled" : ""}
        >
          Pesan Sekarang
        </button>

      </div>
    `;
  });
}

// Filter Kategori
document.querySelectorAll(".kategori-btn")
.forEach(btn => {

  btn.addEventListener("click", () => {

    kategoriAktif = btn.dataset.kategori;

    // Reset semua tombol
    document.querySelectorAll(".kategori-btn")
      .forEach(item => {
        item.classList.remove(
          "bg-amber-900",
          "text-white"
        );

        item.classList.add(
          "bg-amber-600"
        );
      });

    // Tombol yang diklik jadi aktif
    btn.classList.remove("bg-amber-600");

    btn.classList.add(
      "bg-amber-900",
      "text-white"
    );

    filterData();

  });

});

// Search
searchInput.addEventListener("input", filterData);

// Fungsi Filter
function filterData() {

  const keyword =
    searchInput.value.toLowerCase();

  let hasil = dataMebel.filter(item => {

    const cocokKategori =
      kategoriAktif === "Semua"
      || item.kategori_ruangan === kategoriAktif;

    const cocokSearch =
      item.nama_furnitur.toLowerCase()
      .includes(keyword)
      ||
      item.bahan_kayu.toLowerCase()
      .includes(keyword);

    return cocokKategori && cocokSearch;

  });

  renderProduk(hasil);
}

// Simulasi Pemesanan
function pesanProduk(id) {

  const produk = dataMebel.find(
    item => item.id === id
  );

  if (produk.stok > 0) {

    produk.stok--;

    alert(
      `Pesanan berhasil!\nSisa stok: ${produk.stok}`
    );

    filterData();
  }
}

// Tampilkan Awal
renderProduk(dataMebel);