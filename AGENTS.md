# Project Rules

## Assets: Icons & Images

1. Добавляй ассеты по странице: `src/assets/{page-key}/`.
2. Если папки страницы нет, сначала создай:
- `src/assets/{page-key}/icons`
- `src/assets/{page-key}/images`
3. Все файлы `.svg` всегда клади в `icons` (включая логотипы).
4. Растровые форматы (`.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`) клади в `images`.
5. `page-key` задавай в `kebab-case` на основе route страницы.

Пример для `/auth/login`:
- `src/assets/auth-login/icons/logo.svg`
- `src/assets/auth-login/icons/user.svg`
- `src/assets/auth-login/images/background.png`
