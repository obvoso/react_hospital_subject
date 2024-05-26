# Alzguard Prototype (2023.12~2024.03)

## 프로젝트 소개
알츠가드(경도 인지 장애 자가 진단 프로그램) 프로젝트의 새로운 게임 4종 프로토타입 개발
## 프로젝트 개요/동기
‘주식회사 하이‘의 경도 인지장애 자가진단 서비스 Alzguard에 추가 될 새로운 게임의 프로토타입 개발 외주를 맡았습니다. 

Canvas Api, Matter.js 를 사용하여 게임의 애니메이션을 구현하고,  Next.js를 이용하여 사용자와 게임의 상호작용을 구현하였습니다.
<p align="center">
</p>

<br>

## 기술 스택

| TypeScript |  Next   |  Canvas Api   | Recoil | 
| :--------: | :--------: | :------: | :-----: |
| <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> | <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/> | <img src="https://img.shields.io/badge/canvas_api-FFA500?style=for-the-badge&logoColor=orange"/> | <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" /> |

<br>

## 구현 기능

### 기능 1
이동하는 아이템을 분류하는 게임

### 기능 2
아이템의 모양과 위치를 기억하는 게임

### 기능 3
아이템의 이동 순서와 경로를 기억하는 게임

### 기능 4
내려오는 아이템을 합쳐 더 큰 아이템으로 만드는 게임

<br>

## 배운 점 & 아쉬운 점

<p align="justify">
  state의 변경으로 인한 불필요한 렌더링을 최적화 할 수 있는 방법을 다방면으로 배웠던 프로젝트였다. <br>
  부모 컴포넌트의 state 변경으로 인한 자식 컴포넌트의 렌더링, 무분별한 state 사용으로 인한 렌더링 등 <br>
  프로토 타입이긴 하지만 게임의 특성상 성능이 제일 중요한데, <br>
  이걸 웹으로 구현할 때, 성능을 좌우하는 요인인 렌더링을 개선해볼 수 있었던 프로젝트다. <br>
  또한, 새로운 라이브러리를 배우게 되었고, 모바일, 데스크탑을 고려한 반응형 UI 및 이벤트를 관리해본 좋은 경험이 되었다.<br>
  <br>
  하지만 기존 기획안에서 변경된 사항이 많은 점을 고려하지 못한게 아쉽다.<br>
  초반 게임은 전달 받은 기획안 대로 구현을 해서 컨펌을 받았는데,<br>
  고객사에서 정확한 수치를 토대로 기획안을 만든게 아니었기 때문에 <br>
  이번 프로토타입으로 게임의 난이도나 요소를 조정해 나가야 했다.<br><br>
  그렇기 때문에 비 개발자도 손쉽게 게임의 난이도나 요소를 조절할 수 있도록 버튼을 추가했다.<br>
  개발 기획 단계에서 내가 이러한 변경에 유연히 대처할 수 있게 설계를 했었으면 수정이 쉬웠겠지만, <br>
  그렇지 못해 결국 커스텀 페이지를 새로 만들 수 밖에 없었다.<br>
  이 부분이 정말 아쉬운 점으로 남았다.

</p>

<br>
