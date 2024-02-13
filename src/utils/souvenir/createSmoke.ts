// 연기 파티클을 저장할 배열
let smokeParticles: any = [];

export function createSmoke(x: number, y: number, size: number) {
  // 연기 파티클 생성
  for (let i = 0; i < 100; i++) {
    // i === 연기 수
    smokeParticles.push({
      x: x,
      y: y,
      radius: Math.random() * size + 1, // 연기 파티클의 크기 조정
      velocityX: (Math.random() - 0.5) * 1.5, // X축 방향 속도 조정
      velocityY: (Math.random() - 0.5) * 1.5, // Y축 방향 속도 조정
      alpha: 1, // 파티클의 투명도
    });
  }
}

export function updateAndDrawSmoke(context: CanvasRenderingContext2D) {
  smokeParticles.forEach((particle: any, index: number) => {
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.alpha -= 0.02; // 점차 투명해지도록

    if (particle.alpha <= 0) {
      smokeParticles.splice(index, 1); // 파티클 제거
    } else {
      context.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }
  });
}
