export default function AboutPage() {
  return (
    <section className="about-page flex h-[100svh] overflow-hidden bg-[#EDEDED] px-6 text-center md:px-10">
      <div className="m-auto -translate-y-7 text-[15px] leading-[1.6] tracking-[-0.025em] [word-break:keep-all] [overflow-wrap:break-word]">
        <div className="mx-auto max-w-[52rem] space-y-6">
          <p>이 사이트에 방문 하신 것을 진심으로 환영합니다!</p>
          <p>단순한 포트폴리오 사이트처럼 작업물을 단순히 나열하지 않고 제가 이 분야를 작업하면서 보낸 시간의 흐름으로 성장 과정을 기록합니다.</p>
          <p className="pt-3">전체적인 방향은 전시(Gallery)와 회고록(Archive)의 중간 지점으로 기획해 제작했으며 방문자분들은 “이 사람이 어떤 과정을 거쳐 성장해왔는지”를 자연스럽게 봐주시면 감사하겠습니다.</p>
        </div>
      </div>
    </section>
  );
}
