<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="sm xhtml image">

  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap XML &#8212; VIVAZ Clay Targets</title>
        <style><![CDATA[
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
            font-size: 13px;
            line-height: 1.5;
            background: #f5f0e2;
            color: #1c1c1c;
            min-height: 100vh;
          }

          /* ── HEADER ─────────────────────────────────── */
          .hdr {
            background: linear-gradient(135deg, #03441d 0%, #075627 55%, #0a6b32 100%);
            padding: 28px 40px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }
          .hdr-brand { display: flex; align-items: center; gap: 14px; }
          .hdr-icon {
            width: 42px; height: 42px;
            background: rgba(206,223,182,0.18);
            border: 1px solid rgba(206,223,182,0.25);
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .hdr-icon svg { display: block; }
          .hdr-title {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #fff4df;
          }
          .hdr-sub {
            font-size: 11px;
            color: rgba(206,223,182,0.7);
            letter-spacing: 0.07em;
            text-transform: uppercase;
            margin-top: 3px;
          }
          .hdr-count { text-align: right; }
          .hdr-num {
            font-size: 32px;
            font-weight: 800;
            color: #cedfb6;
            letter-spacing: -0.04em;
            line-height: 1;
          }
          .hdr-num-lbl {
            font-size: 10px;
            color: rgba(206,223,182,0.55);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-top: 4px;
          }

          /* ── INFO BAR ────────────────────────────────── */
          .info {
            background: #fff;
            border-bottom: 1px solid #e6e0d0;
            padding: 10px 40px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: #7a7a6a;
          }
          .info svg { flex-shrink: 0; opacity: 0.45; }
          .info a { color: #075627; text-decoration: none; font-weight: 500; }
          .info a:hover { text-decoration: underline; }

          /* ── STATS BAR ───────────────────────────────── */
          .stats {
            background: #fff;
            border-bottom: 1px solid #e6e0d0;
            padding: 14px 40px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }
          .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #f5f0e2;
            border-radius: 20px;
            padding: 5px 13px;
            font-size: 12px;
            font-weight: 500;
            color: #3a3a30;
            white-space: nowrap;
          }
          .dot {
            width: 7px; height: 7px;
            border-radius: 50%;
            flex-shrink: 0;
          }
          .dot-page    { background: #075627; }
          .dot-product { background: #f45b38; }
          .dot-news    { background: #5b8dd9; }

          /* ── TABLE WRAPPER ───────────────────────────── */
          .wrap { padding: 24px 40px 48px; }

          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04);
          }

          /* ── THEAD ──────────────────────────────────── */
          thead tr {
            background: #075627;
          }
          th {
            padding: 11px 14px;
            text-align: left;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #cedfb6;
            white-space: nowrap;
          }
          th.c { text-align: center; }

          /* ── TBODY ──────────────────────────────────── */
          tbody tr { border-bottom: 1px solid #f0ebe0; }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: #faf8ea; }
          td { padding: 9px 14px; vertical-align: middle; }

          /* URL column */
          td.url-td { max-width: 0; width: 42%; }
          .url-link {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #075627;
            font-weight: 500;
            font-size: 12px;
            text-decoration: none;
          }
          .url-link:hover { color: #03441d; text-decoration: underline; }
          .url-domain { color: #bbb; }

          /* Locale badge */
          .loc-badge {
            display: inline-block;
            border-radius: 4px;
            padding: 1px 6px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            white-space: nowrap;
          }
          .loc-es { background: #e8f3ed; color: #075627; }
          .loc-en { background: #eef2fb; color: #3b68b8; }
          .loc-fr { background: #fff0e8; color: #b85a1a; }
          .loc-de { background: #f5f0fb; color: #6b3ab8; }

          /* Section badge */
          .sec-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            border-radius: 4px;
            padding: 2px 7px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            white-space: nowrap;
          }
          .sec-page    { background: #e8f3ed; color: #075627; }
          .sec-product { background: #fef0ec; color: #b84422; }
          .sec-news    { background: #eef2fb; color: #3b68b8; }

          /* Priority bar */
          td.pri-td { width: 120px; }
          .pri-wrap { display: flex; align-items: center; gap: 8px; }
          .pri-val {
            font-size: 12px;
            font-weight: 600;
            color: #333;
            width: 26px;
            text-align: right;
            flex-shrink: 0;
          }
          .pri-track {
            flex: 1;
            height: 5px;
            background: #e6e0d0;
            border-radius: 3px;
            overflow: hidden;
          }
          .pri-fill {
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(90deg, #4a9c5e, #075627);
          }

          /* Freq pill */
          .freq {
            display: inline-block;
            border-radius: 4px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 500;
            white-space: nowrap;
          }
          .freq-weekly  { background: #e8f3ed; color: #075627; }
          .freq-monthly { background: #f5f0e2; color: #666; }

          /* Date */
          .date { font-size: 11px; color: #999; white-space: nowrap; }

          /* Alternates badge */
          .alt-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #cedfb6;
            color: #03441d;
            font-size: 10px;
            font-weight: 700;
            border-radius: 10px;
            padding: 2px 8px;
            white-space: nowrap;
          }

          /* Image badge */
          .img-badge {
            display: inline-flex;
            align-items: center;
            gap: 3px;
            background: #fef0ec;
            color: #b84422;
            font-size: 10px;
            font-weight: 700;
            border-radius: 10px;
            padding: 2px 8px;
            white-space: nowrap;
          }

          /* ── FOOTER ─────────────────────────────────── */
          footer {
            text-align: center;
            padding: 20px 40px;
            font-size: 11px;
            color: #b0aa98;
          }
          footer a { color: #075627; text-decoration: none; }
          footer a:hover { text-decoration: underline; }

          /* ── RESPONSIVE ─────────────────────────────── */
          @media (max-width: 820px) {
            .hdr, .info, .stats, .wrap { padding-left: 16px; padding-right: 16px; }
            .hide-sm { display: none; }
          }
        ]]></style>
      </head>

      <body>

        <!-- ── HEADER ── -->
        <header class="hdr">
          <div class="hdr-brand">
            <div class="hdr-icon">
              <!-- target / clay pigeon SVG -->
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                   stroke="#cedfb6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div>
              <div class="hdr-title">VIVAZ Clay Targets</div>
              <div class="hdr-sub">platosvivaz.com &#xB7; Sitemap XML</div>
            </div>
          </div>
          <div class="hdr-count">
            <div class="hdr-num">
              <xsl:value-of select="count(sm:urlset/sm:url)"/>
            </div>
            <div class="hdr-num-lbl">URLs indexadas</div>
          </div>
        </header>

        <!-- ── INFO BAR ── -->
        <div class="info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4m0 4h.01"/>
          </svg>
          Este archivo XML es procesado por motores de b&#xFA;squeda y crawlers de IA.
          La visualizaci&#xF3;n que ves es solo para humanos y no interfiere en el indexado.
          &#xA0;&#xB7;&#xA0;
          <a href="https://www.sitemaps.org/protocol.html" target="_blank" rel="noopener">
            Protocolo Sitemap 0.9 &#x2197;
          </a>
        </div>

        <!-- ── STATS PILLS ── -->
        <div class="stats">
          <span class="pill">
            <span class="dot dot-page"/>
            <xsl:value-of select="count(sm:urlset/sm:url[
              not(contains(sm:loc,'/productos/')) and
              not(contains(sm:loc,'/noticias/'))
            ])"/>
            &#xA0;p&#xE1;ginas principales
          </span>
          <span class="pill">
            <span class="dot dot-product"/>
            <xsl:value-of select="count(sm:urlset/sm:url[contains(sm:loc,'/productos/')])"/>
            &#xA0;URLs de producto
          </span>
          <span class="pill">
            <span class="dot dot-news"/>
            <xsl:value-of select="count(sm:urlset/sm:url[contains(sm:loc,'/noticias/')])"/>
            &#xA0;URLs de noticias
          </span>
          <span class="pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
            &#xA0;4 idiomas &#xB7; es / en / fr / de
          </span>
          <span class="pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <rect x="3" y="3" width="18" height="13" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
            &#xA0;<xsl:value-of select="count(sm:urlset/sm:url[count(image:image) &gt; 0])"/>
            &#xA0;con im&#xE1;genes
          </span>
        </div>

        <!-- ── TABLE ── -->
        <div class="wrap">
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th class="hide-sm">Idioma</th>
                <th class="hide-sm">Secci&#xF3;n</th>
                <th>Prioridad</th>
                <th class="hide-sm">Frecuencia</th>
                <th class="hide-sm">&#xDA;lt. mod.</th>
                <th class="c">Alt.</th>
                <th class="c hide-sm">Imgs</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:urlset/sm:url">

                <!-- Compute path = everything after the domain -->
                <xsl:variable name="no-proto"
                  select="substring-after(sm:loc, '//')"/>
                <xsl:variable name="path-raw"
                  select="substring-after($no-proto, '/')"/>
                <xsl:variable name="display-path"
                  select="concat('/', $path-raw)"/>

                <!-- Detect locale from path prefix -->
                <xsl:variable name="locale">
                  <xsl:choose>
                    <xsl:when test="starts-with($path-raw, 'en')">en</xsl:when>
                    <xsl:when test="starts-with($path-raw, 'fr')">fr</xsl:when>
                    <xsl:when test="starts-with($path-raw, 'de')">de</xsl:when>
                    <xsl:otherwise>es</xsl:otherwise>
                  </xsl:choose>
                </xsl:variable>

                <!-- Alternate count (excluding x-default) -->
                <xsl:variable name="alt-count"
                  select="count(xhtml:link[@rel='alternate' and @hreflang!='x-default'])"/>

                <tr>

                  <!-- URL -->
                  <td class="url-td">
                    <a class="url-link" href="{sm:loc}" target="_blank" rel="noopener">
                      <xsl:value-of select="$display-path"/>
                    </a>
                  </td>

                  <!-- Locale badge -->
                  <td class="hide-sm">
                    <xsl:choose>
                      <xsl:when test="$locale = 'en'">
                        <span class="loc-badge loc-en">EN</span>
                      </xsl:when>
                      <xsl:when test="$locale = 'fr'">
                        <span class="loc-badge loc-fr">FR</span>
                      </xsl:when>
                      <xsl:when test="$locale = 'de'">
                        <span class="loc-badge loc-de">DE</span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="loc-badge loc-es">ES</span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>

                  <!-- Section badge -->
                  <td class="hide-sm">
                    <xsl:choose>
                      <xsl:when test="contains(sm:loc, '/productos/')">
                        <span class="sec-badge sec-product">Producto</span>
                      </xsl:when>
                      <xsl:when test="contains(sm:loc, '/noticias/')">
                        <span class="sec-badge sec-news">Noticia</span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="sec-badge sec-page">P&#xE1;gina</span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>

                  <!-- Priority with bar -->
                  <td class="pri-td">
                    <div class="pri-wrap">
                      <span class="pri-val">
                        <xsl:value-of select="sm:priority"/>
                      </span>
                      <div class="pri-track">
                        <div class="pri-fill">
                          <xsl:attribute name="style">
                            <xsl:value-of
                              select="concat('width:', number(sm:priority) * 100, '%')"/>
                          </xsl:attribute>
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Frequency -->
                  <td class="hide-sm">
                    <xsl:choose>
                      <xsl:when test="sm:changefreq = 'weekly'">
                        <span class="freq freq-weekly">Semanal</span>
                      </xsl:when>
                      <xsl:when test="sm:changefreq = 'monthly'">
                        <span class="freq freq-monthly">Mensual</span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="freq">
                          <xsl:value-of select="sm:changefreq"/>
                        </span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>

                  <!-- Last modified -->
                  <td class="date hide-sm">
                    <xsl:value-of select="sm:lastmod"/>
                  </td>

                  <!-- hreflang alternates count -->
                  <td style="text-align:center">
                    <xsl:if test="$alt-count &gt; 0">
                      <span class="alt-badge">
                        <xsl:value-of select="$alt-count"/>
                      </span>
                    </xsl:if>
                  </td>

                  <!-- Image count -->
                  <td style="text-align:center" class="hide-sm">
                    <xsl:if test="count(image:image) &gt; 0">
                      <span class="img-badge">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
                        </svg>
                        <xsl:value-of select="count(image:image)"/>
                      </span>
                    </xsl:if>
                  </td>

                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>

        <!-- ── FOOTER ── -->
        <footer>
          Generado autom&#xE1;ticamente &#xB7; VIVAZ Clay Targets &#xB7;
          <a href="https://platosvivaz.com">platosvivaz.com</a>
          &#xB7;
          <a href="https://www.sitemaps.org/protocol.html"
             target="_blank" rel="noopener">Protocolo Sitemap 0.9</a>
        </footer>

      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
