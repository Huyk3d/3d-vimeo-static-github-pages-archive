export default function ContactPage() {
  return (
    <section className="contact-page min-h-[100svh] bg-[#EDEDED] px-6 md:px-10">
      <div className="flex flex-col items-center text-center pt-[calc(50svh-7rem)]">
        <div className="-translate-y-7 space-y-8 text-base md:text-lg">
          <div>
            <p className="font-bold">Insta</p>
            <a href="https://www.instagram.com/huyk_3d/" target="_blank" rel="noreferrer" className="mt-1 inline-block hover:opacity-60">huyk_3d</a>
          </div>
          <div>
            <p className="font-bold">Discord</p>
            <p className="mt-1">kkkkkkh</p>
          </div>
          <div>
            <p className="font-bold">Email</p>
            <p className="mt-1">kwonhy5300@naver.com</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-2xl pb-28 text-center text-sm leading-[1.65] tracking-[-0.025em] text-[#555] md:pb-36 md:text-base [word-break:keep-all] [overflow-wrap:break-word]">
          본 사이트에 오신 것을 진심으로 환영합니다. 이 사이트는 단순한 포트폴리오 사이트처럼 작업물을 단순히 나열하는 것이 아니라, 시간의 흐름(Era)을 기준으로 작업과 성장 과정을 기록합니다. 방문자는 작품을 감상하는 동시에 &quot;이 사람이 어떤 과정을 거쳐 성장해왔는지&quot;를 자연스럽게 느끼는 경험을 목표로 하고있습니다. 전체적인 방향성은 전시(Gallery) 와 회고록(Archive) 의 중간 지점에 위치하며, 작품을 감상하는 경험과 시간의 흐름을 함께 전달하는 사이트를 제작하였습니다.
        </p>
      </div>
    </section>
  );
}
