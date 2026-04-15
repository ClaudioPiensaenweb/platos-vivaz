# Estado del Proyecto -- Vivaz Clay Targets

> Ultima actualizacion: 2026-04-15 por alexPiensaenweb
> Handoff preparado: si

---

## Fase actual

**Fase 8** -- Tecnologia y Sostenibilidad (pendiente)

## Progreso

███████████████░░░░░ 70% (7/10 fases completadas)

- **Completadas**: 7 fases (1-7)
- **En progreso**: 0
- **Pendientes**: 3 fases (8, 9, 10)

## Que se hizo (sesion 2026-04-15)

Cambios del email de Juanma (26/03) + segundo email (15/04):

### Textos
- ✓ Regulacion: 3 textos actualizados (EU 2025/660, 25 anos ventaja, Restriccion HAP) — "platos de arcilla" → "platos de tiro"
- ✓ Tecnologia: Compromiso Ambiental texto nuevo del cliente
- ✓ "Solicitar pedido" → "Solicitar oferta" en boton Y formulario prefilled (4 idiomas)
- ✓ "Aprobado" label + valor "ISSF / FITASC" en specs (4 idiomas)
- ✓ Highlights familia: "ISSF / FITASC" en vez de "Aprobado ISSF" (4 idiomas)
- ✓ Subtitle Natura 110 eliminado ("El plato premium de arcilla") en 4 idiomas

### Fotos
- ✓ HOME seccion ventaja: FOTO VIVAZ LOGO (bosque con logo)
- ✓ Tecnologia "Resina de Pino": FOTO VIVAZ 1 (platos naranjas arbol)
- ✓ Tecnologia "Compromiso Ambiental": FOTO VIVAZ 5 (platos naturales bosque)
- ✓ Extra Rabbit: imagen correcta (naranja frontal, no reverso beige)
- ✓ Eco Star: foto reverso "SUPER VIVAZ COMPETICION"
- ✓ Imagenes de producto comprimidas desde img-productos-actualizado/

### Email contacto
- ✓ Nacional: info@platosvivaz.com en TODOS los sitios (footer, contacto, home, API, schema, llms.txt, email-templates)
- ✓ Footer: Espana (info@ + tel nacional) + Internacional (export@ + tel export)
- ✓ Eliminados todos los emails antiguos (admin@, sales@vivazclaytargets, info@vivazclaytargets)

### Productos Directus
- ✓ 9 productos en BD (7 Natura + 2 Eco Star)
- ✓ Natura Extra Rabbit y Natura Mini Rabbit CREADOS (no existian)
- ✓ Midi 90 y Mini 60 renombrados a Natura Midi 90 / Natura Mini 60 (range → Premium Natura)
- ✓ Natura Rabbit → Natura Rabbit 100
- ✓ Material Eco Star: Resina de Pino 100% (no Hibrido Ecologico)
- ✓ Resina 100% en todos los Natura + Eco Star
- ✓ Colores: Naranja, Negro, Rosa, Verde, Amarillo (Natura 110, Eco Star, todos los nuevos)
- ✓ Logistica actualizada segun tabla de Juanma
- ✓ Traducciones EN/FR/DE para TODOS los productos (27 registros)
- ✓ Altura eliminada de specs y schema JSON-LD

### Ficha producto
- ✓ 8 fichas con URL funcional en 4 idiomas (ES/EN/FR/DE)
- ✓ Slugs corregidos: natura-midi-90, natura-extra-rabbit-110 resuelven correctamente
- ✓ Color dots con tooltip de imagen al hover (5 colores, imagenes 300px)
- ✓ Cuadricula specs organizada en 3 filas limpias
- ✓ LogisticsTable: cards en vez de tabla (no overflow mobile)
- ✓ Cotas verificadas: cada producto tiene su cota correcta del catalogo

### Hero mobile
- ✓ Comportamiento separado mobile/desktop
- ✓ Mobile: video 16:9 arriba + texto sobre fondo crema abajo (90svh)
- ✓ Desktop: video fullscreen clasico con overlay + crosshairs
- ✓ Overlay sutil (15% negro)

### Responsive
- ✓ ProductFeature: texto arriba en mobile (order CSS)
- ✓ Instagram URL corregida: vivazclaytargets (sin underscore)

## Que falta (siguiente)

### Del roadmap:
- ▸ Phase 8 -- Tecnologia y Sostenibilidad: expanded content + SEO headings
- ▸ Phase 9 -- Regulacion 2026: expanded content for shooters/clubs
- ▸ Phase 10 -- Products: VIVAZ RANGE page + disciplines info

### Pendiente del cliente (Juanma):
- ⏳ Foto "Proceso de Fabricacion" para Tecnologia (aun no tiene)
- ⏳ Foto "Nuestra Historia" para Sobre Vivaz (aun no tiene)
- ⏳ Foto cotas real de Eco Star (tiene placeholder del Standard)

## Credenciales servidor

- SSH: vivaz.piensalab.com_mw4mh2ubkvf @ 185.14.57.159
- Password: lZ1wZmu9cb^Va@5l
- Shell: /bin/bash (CageFS habilitado)
- DB: mysql -u vivaz_us -pqd3y0O#Ng@hCgut3 vivaz_bd
- PM2: ecosystem.config.js (directus + nextjs)
- Deploy: build local → tar → sftp upload → extract → pm2 restart
- NOTA: Si PM2 pierde procesos tras reinicio del servidor, ejecutar: cd vivaz && pm2 start ecosystem.config.js

## Notas del dev saliente

> Autor: alexPiensaenweb
> Fecha: 2026-04-15

Sin notas adicionales. Toda la informacion esta en los documentos de .planning/ y en la memoria del proyecto.

---

## Comandos utiles

- `/piensa:continuar` -- retomar el proyecto con todo el contexto
- `/piensa:estado` -- ver estado detallado
- `/piensa:desarrollar` -- empezar con la siguiente tarea
