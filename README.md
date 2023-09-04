# GolfTourWebsite

## Installation

### Running The Application

First, install all the dependencies,

```bash
npm i
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Styling & Repository

Sangat dimohon untuk memperhatikan hal-hal berikut:

1. Penamaan variabel, fungsi, dan kelas yang bermakna
2. Penyingkatan harus mudah ditebak dan masih terbaca
   - Misalkan, codeStylingAndRepository, terlalu panjang, disingkat menjadi: codeStyleNRepo
   - Yang Salah: csnr, cdStNrep
     3.Membuat kelas dengan pascal case (ClassName)
3. Membuat fungsi dan variable dengan camel case (fungsiDanVariabel)
4. Membuat folder dengan kebab case (folder-styling)
5. Membuat file dengan kebab case (file-styling.tsx)
6. Membuat komponen React dan nama filenya dengan pascal case (NamaKomponen)
7. Gunakan design sistem yang sudah tersedia pada konfigurasi tailwindcss

## Semantic Commit Message

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
