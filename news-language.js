(() => {
  const translations = {
    "nrf-masters-fellowship-jiseon-kim": `<span class="news-tag tag-funding">연구비</span><a href="team.html#team-member-jiseon-kim">김지선</a> 님이 <a href="assets/news/nrf-2026-masters-student-research-fellowship-jiseon-kim.png">2026년도 이공분야 학술연구지원사업(석사과정생연구장려금지원사업)</a>에 선정되었습니다. 축하합니다!`,
    "lt-mem-finalist": `<span class="news-tag tag-award">수상</span><a href="publications.html?year=2026&amp;venue=iros&amp;q=LT-Mem#lt-mem">LT-Mem</a>이 <a href="assets/news/lt-mem-iros2026-best-paper-finalist.png">최우수 논문 후보</a>(전체 1,933편 중 10편)로 선정되었습니다. <a href="https://2026.ieee-iros.org/">IROS 2026</a>에서 발표될 예정입니다. <a href="team.html#team-member-yumin-lee">이유민</a> 님, 축하합니다!`,
    "isparo-2026": `<span class="news-tag tag-publication">논문</span>APRL 논문 2편이 <a href="http://isparo.space">iSpaRo 2026</a>에 채택되었습니다. <a href="team.html#team-member-hoyun-kim">김호윤</a> 님의 <a href="publications.html?year=2026&amp;venue=isparo#marslab-isparo-2026">MarsLab</a>과 <a href="publications.html?year=2026&amp;venue=isparo#planetary-robotics-simulation-survey-isparo-2026">행성 로보틱스 시뮬레이션 서베이</a> 논문 채택을 축하합니다.`,
    "spatial-rfm": `<span class="news-tag tag-funding">연구비</span>APRL이 산업통상자원부의 <a href="projects.html#spatial-rfm">2026년도 로봇산업기술개발사업</a>에 선정되었습니다. Spatial-RFM 과제를 통해 비정형 환경에서 휴머노이드와 사족보행 로봇의 내비게이션을 위한 VLM 기반 공간지능 로봇 파운데이션 모델을 개발합니다.`,
    "icros-student-awards": `<span class="news-tag tag-award">수상</span>APRL 논문 3편이 <a href="https://2026.icros.org/">ICROS 2026</a> 학부생 논문상을 수상했습니다: “<a href="publications.html?region=domestic&amp;type=conference&amp;venue=icros#floorplan-point-language-grounded-navigation">평면도 기반 포인트−언어 그라운디드 네비게이션</a>”, “<a href="publications.html?region=domestic&amp;type=conference&amp;venue=icros#rubiks-cube-wheel-transformable-mobile-robot">루빅스 큐브 메커니즘 기반 바퀴 전환형 이동 로봇</a>”, “<a href="publications.html?region=domestic&amp;type=conference&amp;venue=icros#mapless-zero-shot-autonomous-driving">시각-언어 모델을 활용한 미학습 환경에서의 자율주행 방법에 관한 연구</a>”. 모든 저자분께 축하를 전합니다.`,
    "icros-young-researcher": `<span class="news-tag tag-award">수상</span><a href="team.html#team-member-giseop-kim">김기섭</a> 교수님이 <a href="assets/news/icros2026-outstanding-young-researcher-award.jpg">우수신진연구자상</a> 수상자로 선정되어 <a href="assets/news/icros-2026.png">ICROS 2026</a>에서 수상했습니다.`,
    "summer-interns-2026": `<span class="news-tag tag-people">구성원</span>2026년 여름 인턴으로 <a href="team.html#team-member-mingyu-lee">이민규</a> 님, <a href="team.html#team-member-hyunwoo-kim">김현우</a> 님, <a href="team.html#team-member-minseok-oh">오민석</a> 님, <a href="team.html#team-member-ayun-lee">이아윤</a> 님이 APRL에 합류했습니다. 인간 및 다중 로봇 상호작용 내비게이션의 다양한 연구 주제를 함께 탐구할 예정입니다.`,
    "iros-2026-papers": `<span class="news-tag tag-publication">논문</span>APRL 논문 2편이 <a href="https://2026.ieee-iros.org/">IROS 2026</a>에 채택되었습니다. <a href="publications.html?year=2026&amp;venue=iros&amp;q=LT-Mem#lt-mem">LT-Mem</a>의 <a href="team.html#team-member-yumin-lee">이유민</a> 님과 <a href="publications.html?year=2026&amp;venue=iros&amp;q=Mag4D#mag4d-slam-dataset">Mag4D-SLAM Dataset</a>의 <a href="team.html#team-member-bibhutibhusan-nayak">Nayak</a> 님, <a href="team.html#team-member-hyoseok-ju">주효석</a> 님에게 축하를 전합니다.`,
    "brl-2026": `<span class="news-tag tag-funding">연구비</span>APRL이 과학기술정보통신부 기초연구실지원사업의 <a href="projects.html#funded-projects:~:text=Basic%20Research%20Laboratory%20%28Exploratory%20Type%29">개척형 기초연구실</a>에 선정되었습니다. Physical Agentic AI 기반 형태발생적 협력 이동지능을 연구합니다.`,
    "google-cloud-credits": `<span class="news-tag tag-funding">연구비</span>APRL이 Google Cloud Research Credits Program을 통해 5,000달러의 연구 크레딧을 지원받았습니다. 이 지원은 사회적 규범을 준수하는 시각-언어 내비게이션(SC-VLN) 연구의 대규모 멀티모달 추론 및 벤치마크 평가에 활용됩니다.`,
    "icra-workshop-papers": `<span class="news-tag tag-publication">논문</span>연구실 워크숍 논문 3편이 <a href="https://2026.ieee-icra.org/">ICRA 2026</a>에 채택되었습니다. <a href="team.html#team-member-doyeon-kim">김도연</a> 님, <a href="team.html#team-member-bibhutibhusan-nayak">Nayak</a> 님, <a href="team.html#team-member-hyoseok-ju">주효석</a> 님의 논문은 <a href="https://xingxingzuo.github.io/MM-SpatialAI/">MM-SpatialAI Workshop</a>에, <a href="team.html#team-member-hoyun-kim">김호윤</a> 님의 논문은 <a href="https://icra2026-planetary-robotics.github.io/">Workshop on Perceptual Challenges for Planetary Exploration</a>에 채택되었습니다.`,
    "ifac-2026-paper": `<span class="news-tag tag-publication">논문</span><a href="publications.html?q=What%20Matters%20for%20Real-World%20Long-Horizon%20Robot%20Navigation%3F%3A%20An%20Experimental%20Study%20of%20Implicit%20Goals%20and%20Sparse%20Memory">논문 1편</a>이 <a href="https://www.ifac2026.org/">IFAC 2026</a>에 채택되었습니다. <a href="team.html#team-member-bokeon-suh">서보건</a> 님, 축하합니다.`,
    "aims-grant": `<span class="news-tag tag-funding">연구비</span>APRL이 과학기술정보통신부 한국연구재단 신진연구자지원사업(유형 B)에 선정되었습니다. <a href="https://drive.google.com/file/d/1riZrdBLxpxrBbzPsRFEjUunkNA1d4nul/view?usp=sharing">암묵적 인간-로봇 상호작용 기반 다중 로봇 자율화 연구(AIMS)</a>를 4년간(2026–2029) 수행합니다.`,
    "new-members-mar-2026": `<span class="news-tag tag-people">구성원</span><a href="team.html#team-member-doyeon-kim">김도연</a> 님, <a href="team.html#team-member-beomsu-kim">김범수</a> 님, <a href="team.html#team-member-hoyun-kim">김호윤</a> 님이 APRL의 새 구성원으로 합류했습니다.`,
    "icra-scalemaster": `<span class="news-tag tag-publication">논문</span><a href="https://scalemaster-dataset.github.io/">논문 1편</a>이 <a href="https://2026.ieee-icra.org/">ICRA 2026</a>에 채택되었습니다. <a href="team.html#team-member-hyoseok-ju">주효석</a> 님, 축하합니다.`,
    "kroc-young-researcher": `<span class="news-tag tag-award">수상</span><a href="team.html#team-member-giseop-kim">김기섭</a> 교수님이 <a href="https://kros.org/Conference/ConferenceView.asp?AC=0&amp;CODE=CC20250902&amp;CpPage=299#CONF">KRoC 2026 신진연구자</a>로 선정되었습니다. 장기 자율 로봇 내비게이션을 위한 메모리 증강 공간지능 연구를 발표합니다.`,
    "kroc-spatial-ai-tutorial": `<span class="news-tag tag-event">행사</span><a href="team.html#team-member-giseop-kim">김기섭</a> 교수님이 <a href="https://www.linkedin.com/posts/giseop-kim-71683088_%EB%AC%B4%EC%97%87%EC%9D%B4-slam%EC%9D%98-%EB%B3%80%ED%99%94%EB%A5%BC-%EC%9D%B4%EB%81%8C%EC%96%B4%EC%99%94%EC%9D%84%EA%B9%8C%EC%9A%94-%EC%A0%9C21%ED%9A%8C-%ED%95%9C%EA%B5%AD%EB%A1%9C%EB%B4%87%EC%A2%85%ED%95%A9%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C%EC%97%90%EC%84%9C-activity-7425895620810362880-LRP9?utm_source=social_share_send&amp;utm_medium=member_desktop_web&amp;rcm=ACoAABKh1wIBJKgL9GfIG2eO2heHh1Je-GtQu34">KRoC 2026 Spatial AI Tutorial</a>을 기획하고 진행합니다. <a href="https://sites.google.com/view/kroc26-spatial-ai-tutorial/home">튜토리얼 페이지</a>에서 자세한 내용을 확인할 수 있습니다.`,
    "winter-interns-2026": `<span class="news-tag tag-people">구성원</span><a href="team.html#team-member-hyeonwoo-jeong">정현우</a> 님, <a href="team.html#team-member-yewon-kim">김예원</a> 님, <a href="team.html#team-member-ayun-lee">이아윤</a> 님이 2026년 겨울·봄 학기 인턴으로 APRL에 합류했습니다. DGIST 4D 매핑과 지능형 로봇 탐사 연구에 참여합니다.`,
    "heai-poster-award": `<span class="news-tag tag-award">수상</span><a href="team.html#team-member-jiseon-kim">김지선</a> 님이 IROS 2025 <a href="https://heai-iros25-workshop.github.io/">HEAI Workshop</a>에서 <a href="https://www.dropbox.com/scl/fo/dz1m3bmpiiyb2ho8xku8x/ANYZ1dryKAzS2Lg_Z_Q5aQU?rlkey=5wt0uhmzp2s4zia7p1x79ansp&amp;dl=0">Best Poster Award</a>를 수상했습니다. 축하합니다.`,
    "iros-workshops-2025": `<span class="news-tag tag-publication">논문</span>연구실 워크숍 논문 3편이 IROS 2025에 채택되었습니다. <a href="team.html#team-member-hyoseok-ju">주효석</a> 님의 논문은 <a href="https://iros25-ppniv.github.io/">PPNIV Workshop</a>에, <a href="team.html#team-member-jiseon-kim">김지선</a> 님과 <a href="team.html#team-member-bokeon-suh">서보건</a> 님의 논문은 <a href="https://heai-iros25-workshop.github.io/">Human-Aware Embodied AI (HEAI) Workshop</a>에 채택되었습니다.`,
    "nayak-joins": `<span class="news-tag tag-people">구성원</span>DGIST <a href="https://nbest.dgist.ac.kr/PROFESSOR.html">김철기 교수님 연구실</a>에서 근무한 <a href="team.html#team-member-bibhutibhusan-nayak">Bibhutibhusan Nayak</a> 님이 <a href="https://www.hellodd.com/news/articleView.html?idxno=109383">InnoCORE 사업</a>을 통해 APRL에 합류했습니다. Magnetic SLAM 연구를 개척할 예정입니다.`,
    "slam-handbook": `<span class="news-tag tag-release">출간</span><a href="team.html#team-member-giseop-kim">김기섭</a> 교수님이 집필에 참여한 <a href="publications.html?year=2026&amp;type=book&amp;venue=slam-handbook#publications">SLAM Handbook 8장: LiDAR SLAM</a>이 온라인으로 공개되었습니다.`,
    "glocal-lab": `<span class="news-tag tag-funding">연구비</span><a href="https://www.etnews.com/20250911000013">DGIST 로봇및기계전자연구소가 교육부 글로컬랩 사업에 선정</a>되었습니다. APRL은 증강형 인간 로봇을 위한 센서 융합, 로봇 인식, 인지 AI 연구를 수행합니다.`,
    "grad-members-2025": `<span class="news-tag tag-people">구성원</span><a href="team.html#team-member-bokeon-suh">서보건</a> 님, <a href="team.html#team-member-jiseon-kim">김지선</a> 님, <a href="team.html#team-member-yumin-lee">이유민</a> 님, <a href="team.html#team-member-hyoseok-ju">주효석</a> 님이 APRL에 합류해 대학원 연구 여정을 시작했습니다.`,
    "n-hrhr": `<span class="news-tag tag-funding">연구비</span>APRL이 DGIST 창의도전연구(N-HRHR) 사업에 선정되어 6개월간 지원받습니다. Physical AI와 로보틱스 분야의 고위험·고수익 연구를 수행합니다.`,
    "innocore": `<span class="news-tag tag-funding">연구비</span><a href="https://www.hellodd.com/news/articleView.html?idxno=108224">DGIST가 한국형 혁신연구센터(InnoCORE) 사업</a>의 <a href="/projects.html#innocore">Bio-Embodied Physical AI</a> 분야에 선정되었습니다. APRL은 DGIST 연구팀의 일원으로 SLAM, 3D 비전, 시각-언어 내비게이션 분야의 우수한 박사후연구원을 모집합니다.`,
    "ai-star": `<span class="news-tag tag-funding">연구비</span>APRL이 과학기술정보통신부 <a href="https://www.irobotnews.com/news/articleView.html?idxno=40067">AI Star Fellowship</a>의 지원을 받아 <a href="https://www.irobotnews.com/news/articleView.html?idxno=38442">6년간(2025–2030)</a> 연구를 수행합니다.`,
    "jiseon-joins": `<span class="news-tag tag-people">구성원</span><a href="team.html#team-member-jiseon-kim">김지선</a> 님이 APRL에 합류했습니다.`,
    "bokeon-joins": `<span class="news-tag tag-people">구성원</span><a href="team.html#team-member-bokeon-suh">서보건</a> 님이 APRL에 합류했습니다.`,
    "giseop-joins": `<span class="news-tag tag-people">구성원</span><a href="team.html#team-member-giseop-kim">김기섭</a> 교수님이 DGIST 로봇및기계전자공학과 조교수로 부임하고 로봇인식 및 자율화 연구실(APRL)을 설립했습니다.`,
    "lab-founded": `<span class="news-tag tag-lab">연구실</span>DGIST 로봇인식 및 자율화 연구실(APRL)은 <a href="team.html#team-member-giseop-kim">김기섭</a> 교수님이 2024년 12월 설립했습니다.`,
  };

  let currentLanguage = "en";

  function clearLegacyPreference() {
    try {
      window.localStorage.removeItem("aprl-news-language");
    } catch (_error) {
      // The default language does not depend on storage access.
    }
    const params = new URLSearchParams(window.location.search);
    params.delete("lang");
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? "?" + query : ""}${window.location.hash}`);
  }

  function formatNewsDate(time, language) {
    const [year, month] = String(time.getAttribute("datetime") || "").split("-");
    if (!year || !month) return;
    time.textContent = language === "ko"
      ? `${year}년 ${Number(month)}월`
      : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
          .format(new Date(`${year}-${month}-01T00:00:00Z`));
  }

  function translateNewsItems(language) {
    document.querySelectorAll("[data-news-id]").forEach((item) => {
      const paragraph = item.querySelector("p");
      if (!paragraph) return;
      if (!paragraph.dataset.newsHtmlEn) paragraph.dataset.newsHtmlEn = paragraph.innerHTML;
      const korean = translations[item.dataset.newsId];
      paragraph.innerHTML = language === "ko" && korean ? korean : paragraph.dataset.newsHtmlEn;
      const time = item.querySelector("time[datetime]");
      if (time) formatNewsDate(time, language);
    });
  }

  function applyStaticTranslations(language) {
    document.querySelectorAll("[data-news-text-en][data-news-text-ko]").forEach((element) => {
      element.textContent = language === "ko" ? element.dataset.newsTextKo : element.dataset.newsTextEn;
    });
    document.querySelectorAll("[data-news-aria-en][data-news-aria-ko]").forEach((element) => {
      element.setAttribute("aria-label", language === "ko" ? element.dataset.newsAriaKo : element.dataset.newsAriaEn);
    });
  }

  function applyLanguage(language) {
    currentLanguage = language === "ko" ? "ko" : "en";
    if (document.querySelector(".news-page")) {
      document.documentElement.lang = currentLanguage;
      document.title = currentLanguage === "ko" ? "소식 | APRL" : "News | APRL";
    }
    applyStaticTranslations(currentLanguage);
    translateNewsItems(currentLanguage);
    document.querySelectorAll("[data-news-language]").forEach((button) => {
      const active = button.dataset.newsLanguage === currentLanguage;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    window.dispatchEvent(new CustomEvent("aprl:news-language", { detail: { language: currentLanguage } }));
  }

  document.querySelectorAll("[data-news-language]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.newsLanguage);
    });
  });

  window.aprlNewsLanguage = {
    applyCurrent: () => applyLanguage(currentLanguage),
    get current() {
      return currentLanguage;
    },
  };
  clearLegacyPreference();
  applyLanguage("en");
})();
