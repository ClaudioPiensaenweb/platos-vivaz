# Estado del Proyecto -- Vivaz Clay Targets

> Ultima actualizacion: 2026-04-09 por alexPiensaenweb
> Handoff preparado: si

---

## Fase actual

**Fase 8** -- Tecnologia y Sostenibilidad

## Progreso

███████████████░░░░░ 70% (7/10 fases completadas)

- **Completadas**: 7 fases (1-7)
- **En progreso**: 0
- **Pendientes**: 3 fases (8, 9, 10)

## Que se hizo (trabajo reciente fuera del roadmap)

Sesion 2026-04-09 — Cambios del cliente (email Juanma 26/03):

- ✓ Natura 110: eliminado subtitle, colores multi (Naranja/Negro/Rosa/Verde/Amarillo), logistica actualizada
- ✓ Eco Star 110: material Resina 100% (no Hibrido), foto reverso, colores, logistica
- ✓ TechSpecGrid: eliminada altura, eliminadas disciplines, Aprobado ISSF/FITASC
- ✓ Listing productos: Natura 110 ISSF/FITASC, resto solo Sporting, orden correcto
- ✓ Traducciones: "Solicitar oferta" (no pedido), "Aprobado" ISSF/FITASC (4 idiomas)
- ✓ Color dots con tooltip de imagen al hover en specs
- ✓ Traducciones EN/FR/DE de todos los productos insertadas en Directus
- ✓ Instagram Reels: 4 videos WebM comprimidos + componente InstagramReels
- ✓ Hero video de fondo (WebM comprimido 2MB) reemplazando imagen estatica
- ✓ Hero mobile: h-[550px] fijo (no 100dvh), texto compacto
- ✓ Seccion Noticias/Blog: listing + detalle + articulo SEO EU 2025/660
- ✓ Menu separado: Regulacion 2026 + Noticias (4 idiomas)
- ✓ Schemas JSON-LD (Organization, WebSite, BreadcrumbList, Product, BlogPosting)
- ✓ OG image desplegada
- ✓ WhatsApp numero internacional
- ✓ ProductFeature responsive: texto arriba en mobile
- ✓ LogisticsTable: cards en vez de tabla (no overflow mobile)
- ✓ Instagram URL corregida (vivazclaytargets sin underscore)
- ✓ Auditoria GEO completa (5 agentes: Technical, Content, Schema, Citability, Platform)

Sesion anterior — Cambios Codex:

- ✓ Disciplines Directus (Natura Rabbit + Eco Star → solo Sporting)
- ✓ Platos superpuestos en home (naranja sobre crema)
- ✓ Facebook icon en header

## Que falta (siguiente)

- ▸ Phase 8 -- Tecnologia y Sostenibilidad: expanded content + SEO headings
- ▸ Phase 9 -- Regulacion 2026: expanded content for shooters/clubs
- ▸ Phase 10 -- Products: VIVAZ RANGE page + disciplines info

## Pendiente del cliente (Juanma)

- Foto cotas correcta de Natura 110 (la actual no corresponde)
- Foto correcta de Natura Battue (cliente dice que no es la correcta)
- Foto cotas real de Eco Star (hay placeholder)
- Fotos de fabrica para "Sobre Vivaz"
- Decidir video hero definitivo (cliente eligio video 1)

## Credenciales servidor

- SSH: vivaz.piensalab.com_mw4mh2ubkvf @ 185.14.57.159
- Shell: /bin/bash (CageFS habilitado)
- DB: mysql -u vivaz_us -p vivaz_bd
- PM2: ecosystem.config.js (directus + nextjs)
- Deploy: build local → tar → sftp upload → extract → pm2 restart

## Notas del dev saliente

> Autor: alexPiensaenweb
> Fecha: 2026-04-09

Sin notas adicionales. Toda la informacion esta en los documentos de .planning/ y en la memoria del proyecto (.claude/projects/.../memory/).

---

## Comandos utiles

- `/piensa:continuar` -- retomar el proyecto con todo el contexto
- `/piensa:estado` -- ver estado detallado
- `/piensa:desarrollar` -- empezar con la siguiente tarea
