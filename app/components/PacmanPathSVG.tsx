import React from "react";

type PacmanPathSVGProps = {
  className_svg?: string;
  className_path?: string;
  pathId?: string;
  pacmanClass?: string;
  preserveAspectRatio?: string;
};

const PacmanPathSVG: React.FC<PacmanPathSVGProps> = ({
  className_svg,
  className_path,
  pathId = "path-desktop",
  pacmanClass = "pattern-rect-desktop",
  preserveAspectRatio = "xMidYMin meet"
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 922"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className_svg}
      preserveAspectRatio={preserveAspectRatio}
    >
      {/* Background Maze Paths */}
      <path d="M219 45H-6V86.5H170V146.5C170 148.1 52.6667 147.167 -6 146.5V186H219V45Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M141 345H-6V372.078H108.987V411.227C108.987 412.271 32.3289 411.662 -6 411.227V437H141V345Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M1221 603L1463 603V562.918H1273.7V535.535C1273.7 534.298 1399.9 535.02 1463 535.535V494L1221 494V603Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M4 240H392.5V296.5H4M466 250H549V361H786.5V430.5H484.5H236V361H466V250ZM282.5 105.5H786.5V164.5H282.5V105.5Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M902 178.5V23H981V115H1124V23H1434V88C1354.83 88.8333 1196.5 90 1196.5 88V178.5H902Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M-6 626L158 626V729H-6M314.5 691.5H231.5V580.5H-6V511H296L544.5 511V580.5H314.5V691.5ZM498 845L-6 845V786L498 786V845ZM776.5 701.5H388V645H776.5V701.5Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M1454.83 449.423L1048.03 446.783L1048.44 363.285L1455.24 365.925M972.618 408.923L885.974 408.295L886.779 297.298L638.851 295.498L639.356 226L954.616 228.288L1214.03 230.171L1213.52 299.669L973.424 297.926L972.618 408.923ZM1163.13 554.81L636.997 550.992L637.425 491.993L1163.55 495.811L1163.13 554.81Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M1134.96 821.307L1221.61 821.936L1222.41 710.939L1462.51 712.682L1463.02 643.183L1203.6 641.301L888.352 639.013L887.848 708.511L1135.77 710.31L1134.96 821.307Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M885.994 964.005L1412.12 967.823L1412.54 908.824L886.422 905.006L885.994 964.005Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M657.012 859.795L1063.82 862.435L1064.23 778.942L657.422 776.302L657.012 859.795Z" stroke="#153d04ff" strokeWidth="8" />
      <path d="M1538 154H1313V195.5H1489V255.5C1489 257.1 1371.67 256.167 1313 255.5V295H1538V154Z" stroke="#153d04ff" strokeWidth="8" />

      {/* Pacman Shape */}
      <path
        className={pacmanClass}
        d="M730.702 16.6015C729.823 11.6275 727.048 7.16172 722.935 4.09995C718.822 1.03817 713.675 -0.393179 708.525 0.0929956C703.376 0.57917 698.605 2.94692 695.17 6.7213C691.735 10.4957 689.89 15.3976 690.005 20.4437C690.12 25.4899 692.186 30.3071 695.789 33.9291C699.392 37.5511 704.266 39.71 709.433 39.9729C714.599 40.2357 719.676 38.583 723.646 35.3462C727.616 32.1094 730.184 27.528 730.837 22.5209L710.5 20L730.702 16.6015Z" fill="#4BC715"/>


      {/* Track Path */}
      <path
        id={pathId}
        className={className_path}
        d="M713.407 4V60.0746H824V192.992H596V326.429H824V461.424H596V598.495H824V742.316V742.835H710H596V890.291H710V950"
        stroke="#4BC715"
        strokeWidth="7"
        strokeDasharray="10 10"
      />
    </svg>
  );
};

export default PacmanPathSVG;
