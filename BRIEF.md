# CASA MARÉ

Boutique hotel ficticio. Pieza 04: servicios, no ecommerce.

## Promesa

Escondite mediterráneo. Sol, sombra y calma. Tarde lenta, noche tibia.

## Flujo

`Home → Rooms → Gallery → Booking → Contact`

## Qué demuestra

Sitio de servicios, booking UI, galería, storytelling de lugar. Prueba de que el estudio no solo hace tiendas.

## Paleta

Arena, marfil, terracota, azul agua.

| Nombre | Hex aprox. | Uso |
| --- | --- | --- |
| Sand | `#E8D8C4` | Fondos cálidos |
| Sea | `#7A9BA8` | Acento agua |
| Terracotta | `#C47A52` | CTA booking |
| Cream | `#F4EFE6` | Superficies |
| Ink | `#1F1A16` | Tipo |

## Dirección visual

- Hero full-bleed fotográfico + overlay
- Titular serif grande, subtítulo corto
- Barra de reserva (check-in / check-out / guests) sobre la foto
- Rooms como fichas táctiles, no cards de producto
- Galería lenta, contact sencillo

Referencia de estructura (desierto → traducir a Mediterráneo): [`refs/mirador-hotel.jpg`](refs/mirador-hotel.jpg)

No copies Palm Springs. Aquí: cal, pino, agua, lino, luz de tarde.

## UI

Inglés con palabras en español/portugués de lugar (*casa*, *maré*, *terraza*, *cala*). Alternativa: español completo si grabamos para audiencia local.

## Caso de estudio

### Problema
Los sitios de hotel en plantilla son catálogos de habitaciones con un formulario de reserva genérico. No transmiten el lugar ni el momento del día.

### Decisión de diseño
La paleta responde a la hora real del visitante (día / atardecer / noche). La reserva se siente como un ritual, no como un widget.

### Decisión técnica
Variables CSS interpoladas según `Date`; booking con validación, disponibilidad simulada y estados de error.

### Por qué una plantilla no puede
Un tema no cambia la atmósfera del sitio con la luz del día del visitante ni modela estados de reserva con criterio de marca.

### Métricas objetivo
Cambio de tema sin FOUC; booking usable en móvil; Lighthouse Accessibility ≥ 90.
