# GitHub Pages 배포

## 사전 조건

- GitHub 저장소 이름: `gisa-silgi-2026-lab`
- Pages 설정: `Settings > Pages > Build and deployment > Source: GitHub Actions`

## 로컬 확인

```bash
npm install
npm run test
npm run build
npm run preview
```

## 배포

`main` 브랜치에 push하면 `.github/workflows/pages.yml`이 실행됩니다.

```bash
git push origin main
```

프로덕션 빌드의 Vite base는 `/gisa-silgi-2026-lab/`입니다.

## 저작권 자료 제외

공개 저장소에는 PDF, ZIP, 교재 원문, 복원 문제 원문을 포함하지 않습니다. 개인 자료는 `materials/private/`, `data/private/`, `imports/raw/`, `.local/` 아래에 두세요.
