# Back End for Resto Go Application

![./assets/background-resto-go.png](./assets/background-resto-go.png)

Resto Go adalah aplikasi manajemen restoran yang memungkinkan pengguna untuk memesan makanan. Sedangkan dari sisi Admin, dapat melakukan CRUD pada kupon, kategori menu, menu, extra menu. Backend aplikasi ini dibangun menggunakan framework [Express.js](https://expressjs.com/).

## Daftar End Point API

| End Point Coupons                | Keterangan                                            |
| :------------------------------- | :---------------------------------------------------- |
| `GET /coupons/active`            | Mengambil data kupon yang aktif                       |
| `GET /coupons/check/:couponCode` | Mengecek apakah kupon dengan kode tertentu aktif      |
| `GET /coupons/name/:couponCode`  | Mengambil data kupon berdasarkan nama dari kode kupon |
| `GET /coupons`                   | Mengambil semua data kupon                            |
| `GET /coupons/:id`               | Mengambil data kupon berdasarkan ID                   |
| `POST /coupons`                  | Menambahkan data kupon baru                           |
| `PUT /coupons/:id`               | Mengedit data kupon berdasarkan ID                    |
| `DELETE /coupons/:id`            | Menghapus data kupon berdasarkan ID                   |

| End Point Extra Menus         | Keterangan                                 |
| :---------------------------- | :----------------------------------------- |
| `GET /extra-menus`            | Mengambil semua data extra menu            |
| `GET /extra-menus/:id`        | Mengambil data extra menu berdasarkan ID   |
| `GET /extra-menus/name/:name` | Mengambil data extra menu berdasarkan nama |
| `POST /extra-menus`           | Menambahkan data extra menu baru           |
| `PUT /extra-menus/:id`        | Mengedit data extra menu berdasarkan ID    |
| `DELETE /extra-menus/:id`     | Menghapus data extra menu berdasarkan ID   |

| End Point Menu Categories         | Keterangan                                    |
| :-------------------------------- | :-------------------------------------------- |
| `GET /menu-categories`            | Mengambil semua data kategori menu            |
| `GET /menu-categories/:id`        | Mengambil data kategori menu berdasarkan ID   |
| `GET /menu-categories/name/:name` | Mengambil data kategori menu berdasarkan nama |
| `POST /menu-categories`           | Menambahkan data kategori menu baru           |
| `PUT /menu-categories/:id`        | Mengedit data kategori menu berdasarkan ID    |
| `DELETE /menu-categories/:id`     | Menghapus data kategori menu berdasarkan ID   |

| End Point Menus                   | Keterangan                               |
| :-------------------------------- | :--------------------------------------- |
| `GET /menus`                      | Mengambil semua data menu                |
| `GET /menus/:id`                  | Mengambil data menu berdasarkan ID       |
| `GET /menus/name/:name`           | Mengambil data menu berdasarkan nama     |
| `GET /menus/categories/:category` | Mengambil data menu berdasarkan kategori |
| `POST /menus`                     | Menambahkan data menu baru               |
| `PUT /menus/:id`                  | Mengedit data menu berdasarkan ID        |
| `DELETE /menus/:id`               | Menghapus data menu berdasarkan ID       |

| End Point Orders               | Keterangan                                                      |
| :----------------------------- | :-------------------------------------------------------------- |
| `GET /orders`                  | Mengambil semua data pesanan                                    |
| `GET /orders/:id`              | Mengambil data pesanan berdasarkan ID                           |
| `GET /orders/:orderId/menus`   | Mengambil data menu dalam pesanan berdasarkan ID pesanan        |
| `GET /orders/menus/:userId`    | Mengambil data menu pesanan pengguna berdasarkan ID pengguna    |
| `GET /orders/history/:userId`  | Mengambil riwayat menu pesanan pengguna berdasarkan ID pengguna |
| `POST /orders`                 | Menambahkan data pesanan baru                                   |
| `PUT /orders/:id`              | Mengedit data pesanan berdasarkan ID                            |
| `PUT /orders/update-cart/:id`  | Mengupdate keranjang pesanan berdasarkan ID                     |
| `PUT /orders/update-order/:id` | Mengupdate status pesanan menjadi selesai berdasarkan ID        |
| `DELETE /orders/:id`           | Menghapus data pesanan berdasarkan ID                           |

| End Point Users                   | Keterangan                                        |
| :-------------------------------- | :------------------------------------------------ |
| `GET /users`                      | Mengambil semua data pengguna                     |
| `GET /users/:id`                  | Mengambil data pengguna berdasarkan ID            |
| `GET /users/telephone/:telephone` | Mengambil data pengguna berdasarkan nomor telepon |
| `POST /users`                     | Menambahkan data pengguna baru                    |
| `PUT /users/:id`                  | Mengedit data pengguna berdasarkan ID             |
| `PUT /users/name/:id`             | Mengedit nama pengguna berdasarkan ID             |
| `PUT /users/telephone/:id`        | Mengedit nomor telepon pengguna berdasarkan ID    |
| `DELETE /users/:id`               | Menghapus data pengguna berdasarkan ID            |

## Teknologi yang Digunakan

- Node.js
- Express.js
- MongoDB
- Mongoose

## Instalasi

1. Clone repositori ini

   ```bash
   git clone https://github.com/ekaputra04/backend-resto-go.git
   ```

2. Masuk ke direktori proyek

   ```bash
   cd backend-resto-go
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Buat file `.env` di root direktori dan tambahkan konfigurasi berikut:

   ```env
   PORT=
   DB_URI={MongoDB Local/ MongoDB Atlas}
   ```

5. Jalankan server

   ```bash
   npm run start
   ```
