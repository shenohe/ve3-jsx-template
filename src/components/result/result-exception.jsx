import { defineComponent } from "vue";

export default defineComponent({
  props: {
    status: {
      type: String,
      validator: status => ["comingsoon", "403", "404", "500"].includes(status),
      default: undefined
    },
    width: {
      type: [String, Number],
      default: undefined
    }
  },
  setup(props, context) {
    return () => {
      if (!props.status) {
        return;
      }
      else if (props.status === "comingsoon") {
        return (
          <svg width={props.width} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_216_313" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="80" y="9" width="78" height="88">
              <path d="M119 9L157.105 31V75L119 97L80.8949 75V31L119 9Z" fill="currentColor" />
            </mask>
            <g mask="url(#mask0_216_313)">
              <path d="M119 9L157.105 31V75L119 97L80.8949 75V31L119 9Z" fill="currentColor" />
              <g opacity="0.3" filter="url(#filter0_f_216_313)">
                <path d="M68 48L106.105 70V114L68 136L29.8949 114V70L68 48Z" fill="#97A3B7" />
              </g>
            </g>
            <mask id="mask1_216_313" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="29" y="48" width="78" height="88">
              <path d="M68 48L106.105 70V114L68 136L29.8949 114V70L68 48Z" fill="#97A3B7" />
            </mask>
            <g mask="url(#mask1_216_313)">
              <path d="M68 48L106.105 70V114L68 136L29.8949 114V70L68 48Z" fill="#97A3B7" />
              <g filter="url(#filter1_f_216_313)">
                <rect x="46.3906" y="92" width="80" height="60" fill="#E3E6EB" />
              </g>
              <g filter="url(#filter2_f_216_313)">
                <rect y="23" width="80" height="60" fill="#E3E6EB" />
              </g>
            </g>
            <path d="M41.8984 86.2866L44.7267 87.9197L44.727 94.4515L41.8987 92.8185L41.8984 86.2866Z" fill="white" />
            <path d="M53.9189 93.2273L56.7472 94.8603L56.7474 101.392L53.9191 99.7591L53.9189 93.2273Z" fill="white" />
            <path d="M44.7276 107.515L41.8994 105.882L41.8995 109.148L44.7278 110.781L44.7276 107.515L53.9195 112.823L53.9196 116.088L56.7479 117.721L56.7478 114.455L53.9195 112.823L53.9195 109.557L44.7275 104.249L44.7276 107.515Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M108.348 23.4792C106.188 25.9904 106.535 29.3829 109.395 31.5604C112.66 34.0461 117.963 34.007 121.24 31.4731C124.516 28.9392 124.526 24.8699 121.261 22.3841C118.401 20.2066 113.977 19.9666 110.721 21.6439L115.923 25.6047L113.55 27.4399L108.348 23.4792Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M120.865 33.0087L129.83 39.8346L132.203 37.9994L123.238 31.1735C122.917 31.521 122.554 31.8531 122.149 32.1657C121.745 32.4784 121.315 32.7594 120.865 33.0087ZM119.662 32.0932C120.123 31.8557 120.561 31.5798 120.967 31.2655C121.373 30.9513 121.73 30.6134 122.035 30.2579L122.035 30.2579C121.73 30.6134 121.373 30.9513 120.967 31.2655C120.561 31.5798 120.123 31.8557 119.662 32.0931L119.662 32.0932Z" fill="white" />
            <path d="M144 70L168.249 112H119.751L144 70Z" fill="white" stroke="#181818" />
            <path d="M144 100L144 82" stroke="#181818" />
            <path d="M144 105H144.004V105.004H144V105Z" stroke="#181818" stroke-width="2" stroke-linejoin="round" />
            <defs>
              <filter id="filter0_f_216_313" x="23.8949" y="42" width="88.2102" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_216_313" />
              </filter>
              <filter id="filter1_f_216_313" x="-3.60938" y="42" width="180" height="160" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_216_313" />
              </filter>
              <filter id="filter2_f_216_313" x="-50" y="-27" width="180" height="160" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_216_313" />
              </filter>
            </defs>
          </svg>
        );
      }
      else if (props.status === "403") {
        return (
          <svg width={props.width} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g mask="url(#mask0_17_619)">
              <path d="M30 62H118V122H30V62Z" fill="#97A3B7" />
              <g filter="url(#filter0_f_17_619)">
                <rect x="12" y="84" width="80" height="60" fill="#E3E6EB" />
              </g>
              <g filter="url(#filter1_f_17_619)">
                <rect x="80" y="54" width="80" height="60" fill="#E3E6EB" />
              </g>
              <rect x="46" y="105" width="32" height="2" fill="white" />
              <rect x="46" y="98" width="32" height="2" fill="white" />
              <rect x="46" y="88" width="16" height="2" fill="white" />
            </g>
            <path opacity="0.9" d="M63 20H151V30H63V20Z" fill="currentcolor" />
            <mask id="mask1_17_619" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="63" y="30" width="88" height="50">
              <path d="M63 30H151V80H63V30Z" fill="currentcolor" />
            </mask>
            <g mask="url(#mask1_17_619)">
              <path d="M63 30H151V80H63V30Z" fill="currentcolor" />
              <g opacity="0.3" filter="url(#filter2_f_17_619)">
                <path d="M30 62H118V122H30V62Z" fill="#97A3B7" />
              </g>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M95.6863 40.8577L105.964 51.1345C106.295 51.0466 106.642 50.9998 107 50.9998C109.213 50.9998 111 52.7865 111 54.9998C111 55.3574 110.953 55.7038 110.866 56.0333L121.142 66.3135L118.314 69.1419L113.716 64.5448C111.653 65.423 109.384 65.9089 107 65.9089C99.7273 65.9089 93.5164 61.3853 91 54.9998C92.1785 52.0093 94.1673 49.4271 96.6961 47.5268L92.8579 43.6861L95.6863 40.8577ZM99 54.9998C99 59.4158 102.584 62.9998 107 62.9998C108.483 62.9998 109.872 62.5957 111.063 61.8917L108.034 58.8657C107.704 58.9532 107.358 58.9998 107 58.9998C104.787 58.9998 103 57.2131 103 54.9998C103 54.6423 103.047 54.2958 103.134 53.9663L100.107 50.9389C99.4037 52.1295 99 53.5178 99 54.9998ZM107 44.0907C114.273 44.0907 120.484 48.6143 123 54.9998C122.071 57.3574 120.638 59.4612 118.834 61.1773L114.729 57.0717C114.906 56.4108 115 55.7162 115 54.9998C115 50.5838 111.416 46.9998 107 46.9998C106.284 46.9998 105.589 47.0941 104.928 47.2711L102.378 44.7205C103.848 44.3101 105.398 44.0907 107 44.0907Z" fill="white" />
            <rect x="68" y="24" width="2" height="2" fill="white" />
            <rect x="74" y="24" width="2" height="2" fill="white" />
            <rect x="80" y="24" width="66" height="2" fill="white" />
            <path d="M157 53.9998L181.249 95.9998H132.751L157 53.9998Z" fill="white" stroke="black" />
            <path d="M157 88.9998L157 70.9998" stroke="black" />
          </svg>
        );
      }
      else if (props.status === "404") {
        return (
          <svg width={props.width} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g mask="url(#mask0_16559_24301)">
              <path d="M30 62H118V122H30V62Z" fill="#97A3B7" />
              <g filter="url(#filter0_f_16559_24301)">
                <rect x="12" y="84" width="80" height="60" fill="#E3E6EB" />
              </g>
              <g filter="url(#filter1_f_16559_24301)">
                <rect x="80" y="54" width="80" height="60" fill="#E3E6EB" />
              </g>
              <path d="M49 93L42 100L49 107" stroke="white" stroke-width="2" />
              <path d="M69 107L76 100L69 93" stroke="white" stroke-width="2" />
              <path d="M62.3647 87.4431L55.6355 112.557" stroke="white" stroke-width="2" />
            </g>
            <path opacity="0.9" d="M63 20H151V30H63V20Z" fill="currentcolor" />
            <mask id="mask1_16559_24301" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="63" y="30" width="88" height="50">
              <path d="M63 30H151V80H63V30Z" fill="currentcolor" />
            </mask>
            <g mask="url(#mask1_16559_24301)">
              <path d="M63 30H151V80H63V30Z" fill="currentcolor" />
              <g opacity="0.3" filter="url(#filter2_f_16559_24301)">
                <path d="M30 62H118V122H30V62Z" fill="#97A3B7" />
              </g>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M105.25 41C112.015 41 117.5 46.4845 117.5 53.25C117.5 55.6827 116.791 57.9498 115.568 59.8558L121 65.2877L117.288 69L111.856 63.5681C109.95 64.7909 107.683 65.5 105.25 65.5C98.4845 65.5 93 60.0155 93 53.25C93 46.4845 98.4845 41 105.25 41ZM105.25 44.5C100.418 44.5 96.5 48.4175 96.5 53.25C96.5 58.0825 100.418 62 105.25 62C110.082 62 114 58.0825 114 53.25C114 48.4175 110.082 44.5 105.25 44.5Z" fill="white" />
            <rect x="68" y="24" width="2" height="2" fill="white" />
            <rect x="74" y="24" width="2" height="2" fill="white" />
            <rect x="80" y="24" width="66" height="2" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M153 56C140.85 56 131 65.8497 131 78C131 82.6039 132.414 86.8776 134.832 90.4102L127 98.5L139.495 95.3681C143.222 98.2709 147.909 100 153 100C165.15 100 175 90.1503 175 78C175 65.8497 165.15 56 153 56Z" fill="white" />
            <path d="M131 78L131.5 78V78L131 78ZM134.832 90.4102L135.191 90.758L135.475 90.4647L135.245 90.1278L134.832 90.4102ZM127 98.5L126.641 98.1522L125.422 99.411L127.122 98.985L127 98.5ZM139.495 95.3681L139.802 94.9736L139.61 94.8238L139.373 94.8831L139.495 95.3681ZM153 100L153 100.5L153 100.5L153 100ZM175 78L174.5 78L174.5 78L175 78ZM131.5 78C131.5 66.1259 141.126 56.5 153 56.5V55.5C140.574 55.5 130.5 65.5736 130.5 78L131.5 78ZM135.245 90.1278C132.882 86.6757 131.5 82.5 131.5 78H130.5C130.5 82.7079 131.946 87.0794 134.419 90.6926L135.245 90.1278ZM134.473 90.0624L126.641 98.1522L127.359 98.8478L135.191 90.758L134.473 90.0624ZM127.122 98.985L139.616 95.8531L139.373 94.8831L126.878 98.015L127.122 98.985ZM153 99.5C148.024 99.5 143.445 97.8105 139.802 94.9736L139.187 95.7626C143 98.7314 147.794 100.5 153 100.5V99.5ZM174.5 78C174.5 89.8741 164.874 99.5 153 99.5L153 100.5C165.426 100.5 175.5 90.4264 175.5 78L174.5 78ZM153 56.5C164.874 56.5 174.5 66.1259 174.5 78H175.5C175.5 65.5736 165.426 55.5 153 55.5V56.5Z" fill="black" />
          </svg>
        );
      }
      else if (props.status === "500") {
        return (
          <svg width={props.width} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g mask="url(#mask0_16559_24251)">
              <path d="M68 48L106.105 70V114L68 136L29.8949 114V70L68 48Z" fill="#97A3B7" />
              <g filter="url(#filter0_f_16559_24251)">
                <rect x="46.3911" y="92" width="80" height="60" fill="#E3E6EB" />
              </g>
              <g filter="url(#filter1_f_16559_24251)">
                <rect y="23" width="80" height="60" fill="#E3E6EB" />
              </g>
            </g>
            <mask id="mask1_16559_24251" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="80" y="9" width="78" height="88">
              <path d="M119 9L157.105 31V75L119 97L80.8949 75V31L119 9Z" fill="currentcolor" />
            </mask>
            <g mask="url(#mask1_16559_24251)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M80.895 31V75L119 97L157.105 75V31L119 53L80.895 31Z" fill="currentcolor" />
              <path opacity="0.9" d="M119 -35L157.105 -13L157.105 31.5L119 53.5L80.8952 31.5L80.895 -13L119 -35Z" fill="currentcolor" />
              <g opacity="0.3" filter="url(#filter2_f_16559_24251)">
                <path d="M68 48L106.105 70V114L68 136L29.8949 114V70L68 48Z" fill="#97A3B7" />
              </g>
            </g>
            <path d="M143 68.822L147.867 85.875L148 86.3405L148.469 86.2228L165.671 81.911L153.336 94.6522L152.999 95L153.336 95.3478L165.671 108.089L148.469 103.777L148 103.659L147.867 104.125L143 121.178L138.133 104.125L138 103.659L137.531 103.777L120.329 108.089L132.664 95.3478L133.001 95L132.664 94.6522L120.329 81.911L137.531 86.2228L138 86.3405L138.133 85.875L143 68.822Z" fill="white" stroke="black" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M123.243 35.0821L126.071 33.4493L123.243 31.8164L120.414 33.4493L123.243 35.0821ZM119 32.6329L121.828 31L114.757 26.9179L111.929 28.5507L119 32.6329ZM127.485 35.8986C122.806 38.6001 115.194 38.6001 110.515 35.8986C105.835 33.197 105.835 28.803 110.515 26.1014C115.194 23.3999 122.806 23.3999 127.485 26.1014C132.165 28.803 132.165 33.197 127.485 35.8986ZM107.686 24.4686C101.438 28.0756 101.438 33.9244 107.686 37.5314C113.934 41.1384 124.066 41.1384 130.314 37.5314C136.562 33.9244 136.562 28.0756 130.314 24.4686C124.066 20.8616 113.934 20.8616 107.686 24.4686Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.8989 86.2863L44.7272 87.9193L44.7275 94.4512L41.8992 92.8181L41.8989 86.2863ZM53.9194 93.2269L56.7477 94.86L56.7479 101.392L53.9196 99.7587L53.9194 93.2269ZM44.7281 107.515L41.8999 105.882L41.9 109.148L44.7283 110.781L44.7282 107.515L53.92 112.822L53.9201 116.088L56.7484 117.721L56.7483 114.455L53.9201 112.822L53.92 109.556L44.728 104.249L44.7281 107.515Z" fill="white" />
            <defs>
              <filter id="filter0_f_16559_24251" x="-3.60889" y="42" width="180" height="160" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_16559_24251" />
              </filter>
              <filter id="filter1_f_16559_24251" x="-50" y="-27" width="180" height="160" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_16559_24251" />
              </filter>
              <filter id="filter2_f_16559_24251" x="23.895" y="42" width="88.21" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur_16559_24251" />
              </filter>
            </defs>
          </svg>
        );
      }
    };
  }
});