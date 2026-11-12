import React from 'react';
import { Colorway, Product, VisualAngle } from '../types/store';

interface ProductVisualProps {
  product: Product;
  colorway: Colorway;
  angle?: VisualAngle;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  colorway,
  angle = 'profile',
  className = '',
}) => {
  const { primaryHex, accentHex, soleHex } = colorway;
  const uid = `${product.id}-${colorway.id}-${angle}`.replace(/[^a-zA-Z0-9_-]/g, '');

  // Determine bright vs dark primary for realistic highlight/stroke contrast
  const isLightPrimary =
    primaryHex.toLowerCase() === '#e2e8f0' ||
    primaryHex.toLowerCase() === '#f1f3f5' ||
    primaryHex.toLowerCase() === '#ffffff';

  const strokeContrast = isLightPrimary ? '#94A3B8' : 'rgba(255,255,255,0.16)';
  const detailLine = isLightPrimary ? '#475569' : 'rgba(255,255,255,0.28)';

  if (product.category === 'Footwear') {
    const isSpike = product.id === 'kp-apex-spike';

    return (
      <svg
        viewBox="0 0 420 260"
        className={`w-full h-full select-none ${className}`}
        role="img"
        aria-label={`${product.name} in ${colorway.name} (${angle} view)`}
      >
        <defs>
          <radialGradient id={`studio-${uid}`} cx="50%" cy="46%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.18" />
          </radialGradient>
          <linearGradient id={`upper-${uid}`} x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor={primaryHex} />
            <stop offset="100%" stopColor={isLightPrimary ? '#CBD5E1' : '#090B0E'} />
          </linearGradient>
          <linearGradient id={`foam-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={soleHex} />
            <stop offset="55%" stopColor={soleHex} />
            <stop offset="100%" stopColor={isLightPrimary ? '#334155' : '#E2E8F0'} />
          </linearGradient>
          <pattern id={`mesh-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4 H8 M4 0 V8" stroke={detailLine} strokeWidth="0.6" opacity="0.45" />
          </pattern>
        </defs>

        {/* Studio Floor Shadow & Ambient Light */}
        <ellipse cx="210" cy="212" rx="146" ry="14" fill="#0B1C30" opacity="0.1" />
        <ellipse cx="210" cy="210" rx="115" ry="7" fill="#0B1C30" opacity="0.12" />

        {angle === 'chassis' ? (
          /* Bottom Outsole / Carbon Plate Architecture View */
          <g transform="translate(36, 40)">
            {/* Sole Silhouette Top-Down */}
            <path
              d="M36,92 C36,52 96,42 152,48 C206,54 248,38 308,46 C348,51 356,74 352,92 C348,112 332,128 294,132 C238,138 198,122 146,126 C92,130 36,126 36,92 Z"
              fill={soleHex}
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Exposed Carbon Propulsion Fork */}
            <path
              d="M72,90 C128,84 192,82 256,72 L318,62 L322,74 L264,86 L326,98 L322,110 L256,98 C192,98 128,100 72,98 Z"
              fill="#111418"
              stroke={accentHex}
              strokeWidth="1.6"
            />
            {/* Forefoot Grip Pods or Titanium Spike Receptacles */}
            {isSpike ? (
              <g fill={accentHex} stroke="#111418" strokeWidth="1.5">
                <circle cx="268" cy="64" r="5" />
                <circle cx="302" cy="58" r="5" />
                <circle cx="326" cy="76" r="5" />
                <circle cx="284" cy="88" r="5" />
                <circle cx="322" cy="106" r="5" />
                <circle cx="272" cy="112" r="5" />
              </g>
            ) : (
              <g>
                <path
                  d="M236,52 C278,48 326,54 342,76 C346,98 326,120 282,124 C252,126 232,114 236,52 Z"
                  fill={accentHex}
                  opacity="0.88"
                />
                <path
                  d="M248,66 H330 M246,82 H338 M246,98 H332 M254,112 H318"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.65"
                />
              </g>
            )}
            {/* Heel Crash Pad */}
            <path
              d="M46,74 C60,58 84,56 94,64 L90,114 C72,118 52,110 46,94 Z"
              fill={primaryHex}
              opacity="0.85"
            />
          </g>
        ) : (
          /* Profile & Cutaway Side Elevation */
          <g transform="translate(24, 24)">
            {/* Sculpted Midsole Rocker Geometry */}
            <path
              d={
                isSpike
                  ? 'M42,158 C88,162 178,164 256,162 C308,160 352,152 372,138 C364,158 322,172 256,174 C178,176 88,176 38,168 Z'
                  : 'M36,144 C82,154 166,158 242,152 C302,148 348,136 376,120 C378,138 352,162 296,174 C222,188 134,186 54,180 C38,178 30,162 36,144 Z'
              }
              fill={`url(#foam-${uid})`}
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />

            {/* Nitrogen Midsole Sculpture Crease */}
            {!isSpike && (
              <path
                d="M52,160 C124,168 228,168 346,140"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.2"
                strokeDasharray={angle === 'cutaway' ? '4 3' : undefined}
              />
            )}

            {/* Carbon Propulsion Plate (Highlighted in Cutaway, Subtle Edge in Profile) */}
            <path
              d={
                isSpike
                  ? 'M72,165 C154,168 244,168 348,149'
                  : 'M54,166 C132,168 214,154 348,142'
              }
              fill="none"
              stroke={accentHex}
              strokeWidth={angle === 'cutaway' ? '5.5' : '3'}
              strokeLinecap="round"
            />

            {/* Cutaway Internal Lattice Chambers */}
            {angle === 'cutaway' && (
              <g opacity="0.85">
                <circle cx="92" cy="158" r="6" fill="none" stroke={accentHex} strokeWidth="1.3" />
                <circle cx="116" cy="160" r="6" fill="none" stroke={accentHex} strokeWidth="1.3" />
                <circle cx="140" cy="161" r="6" fill="none" stroke={accentHex} strokeWidth="1.3" />
                <circle cx="242" cy="158" r="5" fill="none" stroke={accentHex} strokeWidth="1.3" />
                <circle cx="266" cy="155" r="5" fill="none" stroke={accentHex} strokeWidth="1.3" />
                <circle cx="290" cy="150" r="4.5" fill="none" stroke={accentHex} strokeWidth="1.3" />
              </g>
            )}

            {/* Track Spike Pins in Spike Model */}
            {isSpike && (
              <g fill="#64748B">
                <polygon points="274,173 278,186 282,173" />
                <polygon points="302,170 306,183 310,170" />
                <polygon points="330,164 334,177 338,164" />
              </g>
            )}

            {/* Upper Chassis Body */}
            <path
              d="M42,146 C38,118 42,88 52,64 C66,76 86,88 112,86 C140,84 166,64 188,52 C218,74 268,94 336,104 C362,108 378,114 374,124 C346,138 300,148 242,152 C166,158 84,154 42,146 Z"
              fill={`url(#upper-${uid})`}
              fillOpacity={angle === 'cutaway' ? 0.35 : 0.96}
              stroke={strokeContrast}
              strokeWidth="1.5"
            />

            {/* Monofilament Vapor-Weave Mesh Overlay */}
            <path
              d="M110,126 C154,124 202,110 248,100 C276,108 312,114 340,118 C306,132 238,144 134,142 Z"
              fill={`url(#mesh-${uid})`}
            />

            {/* Kinetic Speed Vector Wing */}
            <path
              d="M84,132 C136,126 196,104 246,84 L268,92 C214,118 150,136 74,140 Z"
              fill={accentHex}
            />

            {/* Precision Lacing & Eyelets */}
            <g stroke={isLightPrimary ? '#111418' : '#FFFFFF'} strokeWidth="2.2" strokeLinecap="round">
              <line x1="186" y1="56" x2="198" y2="66" />
              <line x1="202" y1="66" x2="214" y2="76" />
              <line x1="218" y1="76" x2="230" y2="85" />
              <line x1="234" y1="84" x2="246" y2="93" />
            </g>

            {/* Heel Collar Pull Tab */}
            <path
              d="M46,66 L36,52 L48,48 L56,64 Z"
              fill={accentHex}
            />

            {/* Outsole Rubber Tread Strip */}
            <path
              d="M52,180 C134,186 222,188 296,174 C338,165 364,148 375,134 L375,140 C362,155 334,172 296,179 C222,192 134,190 54,184 Z"
              fill={accentHex}
            />
          </g>
        )}
      </svg>
    );
  }

  if (product.category === 'Outerwear') {
    const isVest = product.id === 'kp-aero-wind-vest';

    return (
      <svg
        viewBox="0 0 360 280"
        className={`w-full h-full select-none ${className}`}
        role="img"
        aria-label={`${product.name} in ${colorway.name} (${angle} view)`}
      >
        <defs>
          <linearGradient id={`garment-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryHex} />
            <stop offset="100%" stopColor={isLightPrimary ? '#CBD5E1' : '#0A0D10'} />
          </linearGradient>
          <pattern id={`vent-${uid}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1" fill={accentHex} opacity="0.55" />
          </pattern>
        </defs>

        <ellipse cx="180" cy="246" rx="86" ry="10" fill="#0B1C30" opacity="0.1" />

        <g transform="translate(40, 20)">
          {/* Collar / Hood */}
          <path
            d={isVest ? 'M110,18 L140,34 L170,18 L164,38 L116,38 Z' : 'M108,8 C126,2 154,2 172,8 L168,36 L112,36 Z'}
            fill={accentHex}
          />

          {/* Torso Shell */}
          <path
            d="M110,30 L74,46 L86,112 L78,214 C118,224 162,224 202,214 L194,112 L206,46 L170,30 Z"
            fill={`url(#garment-${uid})`}
            fillOpacity={angle === 'cutaway' ? 0.45 : 1}
            stroke={strokeContrast}
            strokeWidth="1.5"
          />

          {/* Sleeves (Full Anorak Only) */}
          {!isVest && (
            <>
              <path
                d="M74,46 L30,136 L52,148 L88,88 Z"
                fill={`url(#garment-${uid})`}
                stroke={strokeContrast}
                strokeWidth="1.5"
              />
              <path
                d="M206,46 L250,136 L228,148 L192,88 Z"
                fill={`url(#garment-${uid})`}
                stroke={strokeContrast}
                strokeWidth="1.5"
              />
              {/* Reflective Cuff Bands */}
              <path d="M32,130 L54,142" stroke={accentHex} strokeWidth="4" />
              <path d="M248,130 L226,142" stroke={accentHex} strokeWidth="4" />
            </>
          )}

          {/* Laser-Perforated Ventilation Zone (Chassis / Cutaway) */}
          {(angle === 'chassis' || angle === 'cutaway') && (
            <path
              d="M104,68 H176 V152 H104 Z"
              fill={`url(#vent-${uid})`}
              stroke={accentHex}
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Ultrasonic Welded Center Zip & Chest Pocket */}
          <line x1="140" y1="30" x2="140" y2="218" stroke={accentHex} strokeWidth="2.5" />
          <path
            d="M96,76 H128 V116 H96 Z"
            fill="none"
            stroke={detailLine}
            strokeWidth="1.4"
          />
          <line x1="96" y1="84" x2="128" y2="84" stroke={accentHex} strokeWidth="2" />

          {/* Articulated Seam Lines */}
          <path
            d="M84,162 C116,172 164,172 196,162"
            fill="none"
            stroke={detailLine}
            strokeWidth="1.2"
          />
        </g>
      </svg>
    );
  }

  if (product.category === 'Compression') {
    return (
      <svg
        viewBox="0 0 360 280"
        className={`w-full h-full select-none ${className}`}
        role="img"
        aria-label={`${product.name} in ${colorway.name} (${angle} view)`}
      >
        <defs>
          <linearGradient id={`comp-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={primaryHex} />
            <stop offset="100%" stopColor="#0B0E12" />
          </linearGradient>
        </defs>

        <ellipse cx="180" cy="246" rx="74" ry="9" fill="#0B1C30" opacity="0.1" />

        <g transform="translate(50, 26)">
          {/* Technical Waistband */}
          <path d="M74,20 H186 V42 H74 Z" fill={accentHex} />
          <path d="M84,31 H176" stroke="#111418" strokeWidth="1.5" strokeDasharray="6 4" />

          {/* Left & Right Leg Silhouettes */}
          <path
            d="M74,42 L60,196 L112,202 L130,112 L148,202 L200,196 L186,42 Z"
            fill={`url(#comp-${uid})`}
            fillOpacity={angle === 'cutaway' ? 0.5 : 1}
            stroke={strokeContrast}
            strokeWidth="1.5"
          />

          {/* Graduated Compression Contour Rings */}
          <g
            fill="none"
            stroke={accentHex}
            strokeWidth={angle === 'cutaway' ? '2' : '1.3'}
            opacity={angle === 'profile' ? 0.75 : 1}
          >
            <path d="M68,94 C88,108 112,110 124,104" />
            <path d="M64,136 C86,148 106,150 118,144" />
            <path d="M192,94 C172,108 148,110 136,104" />
            <path d="M196,136 C174,148 154,150 142,144" />
          </g>

          {/* Side Gel Holster Pocket */}
          <path
            d="M180,58 L190,118 L174,122 L166,60 Z"
            fill={soleHex}
            opacity="0.32"
            stroke={accentHex}
            strokeWidth="1.2"
          />

          {/* Raw-Cut Bonded Hems */}
          <line x1="60" y1="190" x2="112" y2="196" stroke={accentHex} strokeWidth="3" />
          <line x1="148" y1="196" x2="200" y2="190" stroke={accentHex} strokeWidth="3" />
        </g>
      </svg>
    );
  }

  /* Hydration Pack / Trail Vest */
  return (
    <svg
      viewBox="0 0 360 280"
      className={`w-full h-full select-none ${className}`}
      role="img"
      aria-label={`${product.name} in ${colorway.name} (${angle} view)`}
    >
      <defs>
        <pattern id={`hex-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 L5 0 L10 5 L5 10 Z" fill="none" stroke={detailLine} strokeWidth="0.7" />
        </pattern>
      </defs>

      <ellipse cx="180" cy="246" rx="82" ry="10" fill="#0B1C30" opacity="0.1" />

      <g transform="translate(50, 24)">
        {/* Vest Main Frame */}
        <path
          d="M84,22 C108,16 152,16 176,22 L196,64 L188,208 C154,218 106,218 72,208 L64,64 Z"
          fill={primaryHex}
          fillOpacity={angle === 'cutaway' ? 0.48 : 0.98}
          stroke={strokeContrast}
          strokeWidth="1.6"
        />

        {/* 3D Hex-Mesh Ventilation Channel */}
        <path
          d="M96,38 H164 V196 H96 Z"
          fill={`url(#hex-${uid})`}
        />

        {/* Dual 500 ml Soft-Flask Holsters */}
        <g>
          <rect
            x="76"
            y="74"
            width="28"
            height="86"
            rx="10"
            fill={soleHex}
            stroke={accentHex}
            strokeWidth="1.6"
          />
          <rect x="85" y="60" width="10" height="14" rx="3" fill={accentHex} />

          <rect
            x="156"
            y="74"
            width="28"
            height="86"
            rx="10"
            fill={soleHex}
            stroke={accentHex}
            strokeWidth="1.6"
          />
          <rect x="165" y="60" width="10" height="14" rx="3" fill={accentHex} />
        </g>

        {/* Micro-Ratchet Sternum Straps */}
        <g stroke={accentHex} strokeWidth="3" strokeLinecap="round">
          <line x1="106" y1="96" x2="154" y2="96" />
          <line x1="106" y1="130" x2="154" y2="130" />
        </g>
        <circle cx="130" cy="96" r="5" fill="#111418" stroke={accentHex} strokeWidth="1.5" />
        <circle cx="130" cy="130" r="5" fill="#111418" stroke={accentHex} strokeWidth="1.5" />

        {/* Lower Lumbar Stow Compartment */}
        <path
          d="M80,174 H180 L176,204 C146,210 114,210 84,204 Z"
          fill={accentHex}
          opacity={angle === 'cutaway' ? 0.55 : 0.88}
        />
      </g>
    </svg>
  );
};
