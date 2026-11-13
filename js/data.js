// Catálogo de ingredientes: clave -> [nombre, emoji, categoría]
window.ING = {
  tomate: ['Tomate', '🍅', 'Verduras'], cebolla: ['Cebolla', '🧅', 'Verduras'], ajo: ['Ajo', '🧄', 'Verduras'],
  patata: ['Patata', '🥔', 'Verduras'], zanahoria: ['Zanahoria', '🥕', 'Verduras'], pimiento: ['Pimiento', '🫑', 'Verduras'],
  guindilla: ['Guindilla / chile', '🌶️', 'Verduras'], pepino: ['Pepino', '🥒', 'Verduras'], berenjena: ['Berenjena', '🍆', 'Verduras'],
  calabacin: ['Calabacín', '🥒', 'Verduras'], brocoli: ['Brócoli', '🥦', 'Verduras'], espinacas: ['Espinacas', '🥬', 'Verduras'],
  champinones: ['Champiñones', '🍄', 'Verduras'], aguacate: ['Aguacate', '🥑', 'Verduras'], jengibre: ['Jengibre', '🫚', 'Verduras'],
  pollo: ['Pollo', '🍗', 'Proteínas'], ternera: ['Ternera', '🥩', 'Proteínas'], bacon: ['Bacon / panceta', '🥓', 'Proteínas'],
  pescado: ['Pescado blanco', '🐟', 'Proteínas'], gambas: ['Gambas', '🍤', 'Proteínas'], huevo: ['Huevos', '🥚', 'Proteínas'],
  garbanzos: ['Garbanzos cocidos', '🫘', 'Proteínas'], lentejas: ['Lentejas', '🫘', 'Proteínas'],
  queso: ['Queso', '🧀', 'Lácteos'], leche: ['Leche', '🥛', 'Lácteos'], mantequilla: ['Mantequilla', '🧈', 'Lácteos'], yogur: ['Yogur natural', '🥣', 'Lácteos'],
  arroz: ['Arroz', '🍚', 'Despensa'], pasta: ['Pasta', '🍝', 'Despensa'], fideos: ['Fideos / noodles', '🍜', 'Despensa'],
  harina: ['Harina', '🌾', 'Despensa'], pan: ['Pan', '🍞', 'Despensa'], tortillas: ['Tortillas de trigo o maíz', '🫓', 'Despensa'],
  soja: ['Salsa de soja', '🍶', 'Despensa'], caldo: ['Caldo', '🍲', 'Despensa'], coco: ['Leche de coco', '🥥', 'Despensa'],
  curry: ['Curry / especias', '🍛', 'Despensa'], miel: ['Miel', '🍯', 'Despensa'], cacahuetes: ['Cacahuetes', '🥜', 'Despensa'],
  aceitunas: ['Aceitunas', '🫒', 'Despensa'],
  limon: ['Limón / lima', '🍋', 'Hierbas y cítricos'], cilantro: ['Cilantro', '🌿', 'Hierbas y cítricos'],
  albahaca: ['Albahaca', '🍃', 'Hierbas y cítricos'], perejil: ['Perejil', '☘️', 'Hierbas y cítricos']
};

// Básicos que se dan por hechos en cualquier cocina
window.STAPLES = {
  sal: ['Sal', '🧂'], aceite: ['Aceite de oliva', '🫗'], pimienta: ['Pimienta', '🧂'],
  agua: ['Agua', '💧'], azucar: ['Azúcar', '🍬'], vinagre: ['Vinagre', '🍾']
};

window.CUISINES = {
  'Española': '#e63946', 'Italiana': '#2a9d8f', 'Mexicana': '#f4a261', 'Japonesa': '#e76f8a', 'China': '#d62828',
  'India': '#f77f00', 'Tailandesa': '#6a994e', 'Francesa': '#457b9d', 'Griega': '#4895ef', 'Oriente Medio': '#b5838d',
  'Americana': '#6d597a', 'Peruana': '#bc6c25'
};

window.RECIPES = [];
// R(id, nombre, cocina, dificultad 1-3, minutos, raciones, [vajilla, color, toppings], ingredientes, pasos)
function R(id, name, cuisine, dif, time, serv, art, ing, steps) {
  RECIPES.push({
    id, name, cuisine, dif, time, serv,
    art: { v: art[0], col: art[1], top: art[2].split(' ') },
    ing: ing.split('|').map(s => { const [k, q] = s.split(':'); return { k, q: q || '' }; }),
    steps: steps.map(s => ({ a: s[0], text: s[1], items: s[2] ? s[2].split(' ') : [], sc: s[3] }))
  });
}

/* ---------- Española ---------- */
R('tortilla', 'Tortilla de patatas', 'Española', 2, 40, 4, ['pan', '#f2c14e', '🥔 🧅 🥚'],
  'patata:4 medianas|huevo:6|cebolla:1|aceite:abundante|sal:al gusto', [
  ['cortar', 'Pela las patatas y córtalas en láminas finas. Corta también la cebolla en juliana.', 'patata cebolla'],
  ['freir', 'Fríe las patatas y la cebolla a fuego suave en abundante aceite durante unos 20 minutos, hasta que estén tiernas.', 'patata cebolla'],
  ['mezclar', 'Bate los huevos con una pizca de sal y mézclalos con las patatas bien escurridas. Deja reposar 5 minutos.', 'huevo patata'],
  ['freir', 'Cuaja la mezcla en una sartén con un poco de aceite, 3 minutos por cada lado. Dale la vuelta con ayuda de un plato.', 'huevo'],
  ['emplatar', 'Deja templar la tortilla un par de minutos y sírvela en porciones.']
]);
R('gazpacho', 'Gazpacho andaluz', 'Española', 1, 15, 4, ['bowl', '#e8553d', '🥒 🫑 🍞'],
  'tomate:1 kg maduros|pepino:1|pimiento:1 verde|ajo:1 diente|pan:1 rebanada|aceite:50 ml|vinagre:2 cucharadas|sal:al gusto', [
  ['cortar', 'Lava y trocea los tomates, el pepino pelado y el pimiento. Pela el diente de ajo.', 'tomate pepino pimiento ajo'],
  ['triturar', 'Tritura las verduras con el pan remojado, el aceite, el vinagre y la sal hasta obtener una crema fina.', 'tomate pepino pan'],
  ['reposar', 'Cuela el gazpacho si lo quieres más fino y enfríalo en la nevera al menos 1 hora.', 'tomate'],
  ['emplatar', 'Sírvelo muy frío, con daditos de pepino y pimiento por encima y un hilo de aceite.']
]);
R('paella', 'Paella de pollo y verduras', 'Española', 3, 55, 4, ['pan', '#f4b942', '🍗 🫑 🍋 🍅'],
  'arroz:400 g|pollo:500 g troceado|pimiento:1 rojo|tomate:2 rallados|ajo:2 dientes|caldo:1 litro caliente|aceite:4 cucharadas|sal:al gusto', [
  ['cortar', 'Corta el pimiento en tiras, pica el ajo y ralla los tomates.', 'pimiento ajo tomate'],
  ['freir', 'Dora el pollo salado en la paellera con aceite. Añade el pimiento y sofríe 5 minutos.', 'pollo pimiento'],
  ['freir', 'Incorpora el ajo y el tomate rallado y cocina hasta que el sofrito oscurezca. Añade el arroz y remueve 1 minuto.', 'ajo tomate arroz'],
  ['hervir', 'Vierte el caldo caliente, reparte bien el arroz y no remuevas más. Cuece 10 minutos a fuego fuerte y 8 a fuego suave.', 'caldo arroz'],
  ['reposar', 'Apaga el fuego, cubre con un paño limpio y deja reposar 5 minutos.', 'arroz'],
  ['emplatar', 'Sirve la paella directamente de la paellera, con unos gajos de limón si te gusta.']
]);
R('gambas', 'Gambas al ajillo', 'Española', 1, 10, 2, ['pan', '#e9a23b', '🍤 🍤 🧄 🌶️ 🍤'],
  'gambas:300 g peladas|ajo:4 dientes|guindilla:1|perejil:unas ramas|aceite:6 cucharadas|sal:al gusto', [
  ['cortar', 'Lamina los ajos, corta la guindilla en aros y pica el perejil.', 'ajo guindilla perejil'],
  ['freir', 'Calienta el aceite a fuego medio y dora suavemente el ajo con la guindilla, sin que se queme.', 'ajo guindilla'],
  ['freir', 'Sube el fuego, añade las gambas con sal y saltéalas 2 minutos, hasta que cambien de color.', 'gambas'],
  ['emplatar', 'Espolvorea el perejil y sirve de inmediato, bien caliente, con pan para mojar.']
]);

/* ---------- Italiana ---------- */
R('carbonara', 'Espaguetis a la carbonara', 'Italiana', 2, 20, 2, ['plate', '#f3d98b', '🥓 🧀 🥓'],
  'pasta:200 g de espaguetis|huevo:3 yemas|bacon:100 g|queso:60 g rallado|pimienta:abundante|sal:para el agua', [
  ['hervir', 'Cuece los espaguetis en abundante agua con sal hasta que estén al dente. Reserva un vaso del agua de cocción.', 'pasta'],
  ['freir', 'Mientras tanto, dora el bacon en tiras en una sartén sin aceite hasta que esté crujiente.', 'bacon'],
  ['mezclar', 'Bate las yemas con el queso rallado y mucha pimienta hasta formar una crema espesa.', 'huevo queso'],
  ['mezclar', 'Fuera del fuego, mezcla la pasta con el bacon y la crema de huevo. Añade agua de cocción poco a poco hasta que quede sedosa.', 'pasta bacon huevo'],
  ['emplatar', 'Sirve enseguida con más queso y pimienta recién molida.']
]);
R('pomodoro', 'Pasta al pomodoro', 'Italiana', 1, 25, 2, ['plate', '#e4572e', '🍃 🧄 🍃'],
  'pasta:200 g|tomate:500 g maduros|ajo:2 dientes|albahaca:unas hojas|aceite:3 cucharadas|sal:al gusto', [
  ['cortar', 'Trocea los tomates y lamina los ajos.', 'tomate ajo'],
  ['freir', 'Dora el ajo en aceite, añade el tomate con sal y cocina 15 minutos a fuego medio hasta que espese.', 'ajo tomate'],
  ['hervir', 'Cuece la pasta en agua con sal hasta que esté al dente y escúrrela.', 'pasta'],
  ['mezclar', 'Mezcla la pasta con la salsa y unas hojas de albahaca rotas con las manos.', 'pasta tomate albahaca'],
  ['emplatar', 'Sirve con un hilo de aceite crudo y albahaca fresca.']
]);
R('risotto', 'Risotto de champiñones', 'Italiana', 2, 40, 3, ['plate', '#e8dcc0', '🍄 🍄 🧀 🍄'],
  'arroz:300 g|champinones:300 g|cebolla:1|caldo:1 litro caliente|queso:50 g rallado|mantequilla:40 g|sal:al gusto', [
  ['cortar', 'Pica la cebolla muy fina y lamina los champiñones.', 'cebolla champinones'],
  ['freir', 'Pocha la cebolla con la mitad de la mantequilla. Añade los champiñones y saltea hasta que pierdan el agua.', 'cebolla champinones mantequilla'],
  ['freir', 'Agrega el arroz y remueve 2 minutos para que se nacare.', 'arroz'],
  ['hervir', 'Añade el caldo caliente cazo a cazo, removiendo sin parar, durante unos 18 minutos hasta que el arroz esté cremoso.', 'caldo arroz'],
  ['mezclar', 'Fuera del fuego, incorpora el resto de la mantequilla y el queso. Remueve con energía y deja reposar 2 minutos.', 'mantequilla queso'],
  ['emplatar', 'Sirve el risotto meloso, recién hecho.']
]);
R('caprese', 'Ensalada caprese', 'Italiana', 1, 10, 2, ['plate', '#f7f3ea', '🍅 🧀 🍅 🧀 🍃 🍃'],
  'tomate:3 maduros|queso:250 g de mozzarella|albahaca:un manojo|aceite:3 cucharadas|sal:al gusto|pimienta:al gusto', [
  ['cortar', 'Corta los tomates y la mozzarella en rodajas de medio centímetro.', 'tomate queso'],
  ['emplatar', 'Alterna en el plato rodajas de tomate, mozzarella y hojas de albahaca. Aliña con aceite, sal y pimienta.']
]);

/* ---------- Mexicana ---------- */
R('guacamole', 'Guacamole', 'Mexicana', 1, 10, 4, ['bowl', '#9bc53d', '🍅 🧅 🌿 🍋'],
  'aguacate:3 maduros|tomate:1|cebolla:media|limon:1|cilantro:un manojo|sal:al gusto', [
  ['cortar', 'Pica muy fino el tomate sin semillas, la cebolla y el cilantro.', 'tomate cebolla cilantro'],
  ['mezclar', 'Aplasta los aguacates con un tenedor, dejando algunos trozos. Añade el zumo de limón y la sal.', 'aguacate limon'],
  ['mezclar', 'Incorpora el tomate, la cebolla y el cilantro y mezcla con suavidad.', 'tomate cebolla cilantro'],
  ['emplatar', 'Sírvelo al momento con totopos o sobre tostadas.']
]);
R('tacos', 'Tacos de pollo', 'Mexicana', 1, 25, 3, ['plate', '#f0c987', '🫓 🍗 🥑 🌿 🍋'],
  'tortillas:8|pollo:400 g de pechuga|cebolla:1|cilantro:un manojo|limon:2|aguacate:1|aceite:2 cucharadas|sal:al gusto', [
  ['cortar', 'Corta el pollo en tiras finas. Pica la cebolla y el cilantro, y lamina el aguacate.', 'pollo cebolla cilantro aguacate'],
  ['freir', 'Saltea el pollo con sal a fuego fuerte durante 8 minutos, hasta que esté bien dorado. Riégalo con zumo de limón.', 'pollo limon'],
  ['freir', 'Calienta las tortillas en una sartén seca, medio minuto por cada lado.', 'tortillas'],
  ['emplatar', 'Rellena cada tortilla con pollo, cebolla, cilantro y aguacate. Termina con unas gotas de limón.']
]);
R('quesadillas', 'Quesadillas de queso y pimiento', 'Mexicana', 1, 10, 2, ['plate', '#f6d186', '🫓 🧀 🫑'],
  'tortillas:4|queso:200 g rallado|pimiento:1', [
  ['cortar', 'Corta el pimiento en tiras muy finas.', 'pimiento'],
  ['freir', 'Pon una tortilla en la sartén, reparte queso y pimiento sobre una mitad y dóblala.', 'tortillas queso pimiento'],
  ['freir', 'Dórala 2 minutos por cada lado, hasta que el queso se funda y la tortilla quede crujiente.', 'tortillas'],
  ['emplatar', 'Córtalas en triángulos y sírvelas calientes.']
]);
R('rancheros', 'Huevos rancheros', 'Mexicana', 1, 20, 2, ['plate', '#d9482b', '🍳 🍳 🌶️ 🌿'],
  'huevo:4|tortillas:4|tomate:3|cebolla:media|guindilla:1|aceite:3 cucharadas|sal:al gusto', [
  ['cortar', 'Pica el tomate, la cebolla y la guindilla.', 'tomate cebolla guindilla'],
  ['freir', 'Sofríe la cebolla y la guindilla, añade el tomate con sal y cocina 10 minutos hasta tener una salsa espesa.', 'cebolla guindilla tomate'],
  ['freir', 'En otra sartén, calienta las tortillas y fríe los huevos dejando la yema líquida.', 'tortillas huevo'],
  ['emplatar', 'Coloca cada huevo sobre una tortilla y cúbrelo con la salsa ranchera bien caliente.']
]);

/* ---------- China ---------- */
R('arrozfrito', 'Arroz frito con huevo', 'China', 1, 15, 2, ['bowl', '#e9c46a', '🥕 🥚 🧅'],
  'arroz:300 g cocido y frío|huevo:2|zanahoria:1|cebolla:1 pequeña|soja:2 cucharadas|aceite:2 cucharadas', [
  ['cortar', 'Corta la zanahoria y la cebolla en dados pequeños.', 'zanahoria cebolla'],
  ['freir', 'Cuaja los huevos batidos en el wok bien caliente, rómpelos en trozos y resérvalos.', 'huevo'],
  ['freir', 'Saltea la zanahoria y la cebolla 3 minutos. Añade el arroz frío y saltea a fuego fuerte otros 3 minutos.', 'zanahoria cebolla arroz'],
  ['mezclar', 'Incorpora el huevo y la salsa de soja y mezcla bien.', 'huevo soja'],
  ['emplatar', 'Sirve el arroz frito muy caliente en cuencos.']
]);
R('pollobrocoli', 'Pollo salteado con brócoli', 'China', 1, 20, 2, ['plate', '#c98b4a', '🥦 🍗 🥦 🍗'],
  'pollo:300 g de pechuga|brocoli:1 pequeño|soja:3 cucharadas|ajo:2 dientes|jengibre:1 trozo|aceite:2 cucharadas', [
  ['cortar', 'Corta el pollo en dados y separa el brócoli en ramilletes. Pica el ajo y el jengibre.', 'pollo brocoli ajo jengibre'],
  ['hervir', 'Escalda el brócoli 2 minutos en agua hirviendo y escúrrelo.', 'brocoli'],
  ['freir', 'Saltea el pollo a fuego fuerte hasta dorarlo. Añade el ajo y el jengibre y cocina 1 minuto.', 'pollo ajo jengibre'],
  ['freir', 'Incorpora el brócoli y la salsa de soja y saltea 2 minutos más.', 'brocoli soja'],
  ['emplatar', 'Sírvelo recién hecho, solo o con arroz blanco.']
]);
R('chowmein', 'Tallarines salteados con verduras', 'China', 1, 20, 2, ['plate', '#d9a05b', '🥕 🫑 🍜'],
  'fideos:200 g|zanahoria:1|pimiento:1|soja:3 cucharadas|ajo:2 dientes|aceite:2 cucharadas', [
  ['hervir', 'Cuece los fideos según indique el paquete, escúrrelos y pásalos por agua fría.', 'fideos'],
  ['cortar', 'Corta la zanahoria y el pimiento en tiras finas y pica el ajo.', 'zanahoria pimiento ajo'],
  ['freir', 'Saltea las verduras a fuego muy fuerte durante 3 minutos, que queden crujientes.', 'zanahoria pimiento ajo'],
  ['freir', 'Añade los fideos y la salsa de soja y saltea 2 minutos sin dejar de mover.', 'fideos soja', 'wok'],
  ['emplatar', 'Sirve los tallarines humeantes.']
]);

/* ---------- Japonesa ---------- */
R('teriyaki', 'Pollo teriyaki', 'Japonesa', 1, 25, 2, ['bowl', '#f5f0e6', '🍗 🍗 🍚 🍗'],
  'pollo:400 g de muslo deshuesado|soja:4 cucharadas|miel:2 cucharadas|jengibre:1 trozo|arroz:200 g|aceite:1 cucharada', [
  ['hervir', 'Cuece el arroz en el doble de agua, tapado y a fuego suave, durante 15 minutos.', 'arroz'],
  ['mezclar', 'Mezcla la salsa de soja con la miel y el jengibre rallado para hacer la salsa teriyaki.', 'soja miel jengibre'],
  ['freir', 'Dora el pollo en trozos por todos los lados durante 6 minutos.', 'pollo'],
  ['freir', 'Vierte la salsa y cocina 3 minutos, hasta que reduzca y el pollo quede brillante.', 'pollo soja'],
  ['emplatar', 'Sirve el pollo glaseado sobre el arroz blanco.']
]);
R('oyakodon', 'Oyakodon', 'Japonesa', 2, 25, 2, ['bowl', '#f6d77a', '🍗 🥚 🧅'],
  'pollo:250 g de muslo|huevo:3|cebolla:1|soja:3 cucharadas|arroz:200 g|azucar:1 cucharada', [
  ['hervir', 'Cuece el arroz y mantenlo caliente.', 'arroz'],
  ['cortar', 'Corta el pollo en bocados y la cebolla en juliana fina.', 'pollo cebolla'],
  ['hervir', 'Cuece la cebolla y el pollo 8 minutos en un vaso de agua con la salsa de soja y el azúcar.', 'cebolla pollo soja'],
  ['freir', 'Vierte los huevos ligeramente batidos por encima, tapa y cuaja solo 1 minuto para que queden jugosos.', 'huevo'],
  ['emplatar', 'Desliza el pollo con huevo sobre un cuenco de arroz caliente.']
]);
R('ramen', 'Ramen casero rápido', 'Japonesa', 2, 30, 2, ['bowl', '#d9a441', '🍜 🥚 🥬 🥚'],
  'fideos:200 g|caldo:1 litro|huevo:2|soja:3 cucharadas|espinacas:2 puñados|ajo:2 dientes|jengibre:1 trozo', [
  ['hervir', 'Cuece los huevos 6 minutos y medio, enfríalos en agua con hielo y pélalos.', 'huevo'],
  ['hervir', 'Hierve el caldo 10 minutos con el ajo, el jengibre y la salsa de soja.', 'caldo ajo jengibre soja'],
  ['hervir', 'Cuece los fideos aparte y añade las espinacas al caldo en el último minuto.', 'fideos espinacas'],
  ['emplatar', 'Reparte los fideos en cuencos, cubre con el caldo y corona con el huevo partido por la mitad.']
]);

/* ---------- India ---------- */
R('chana', 'Curry de garbanzos (chana masala)', 'India', 1, 30, 3, ['bowl', '#d98324', '🫘 🌿 🫘'],
  'garbanzos:400 g|tomate:3|cebolla:1|ajo:2 dientes|jengibre:1 trozo|curry:2 cucharadas|aceite:2 cucharadas|sal:al gusto', [
  ['cortar', 'Pica la cebolla, el ajo y el jengibre. Trocea los tomates.', 'cebolla ajo jengibre tomate'],
  ['freir', 'Pocha la cebolla 5 minutos. Añade el ajo, el jengibre y el curry y tuesta 1 minuto.', 'cebolla ajo curry'],
  ['hervir', 'Agrega el tomate, los garbanzos y medio vaso de agua. Cuece 15 minutos a fuego suave.', 'tomate garbanzos'],
  ['emplatar', 'Rectifica de sal y sirve caliente, con arroz o pan.']
]);
R('pollocurry', 'Pollo al curry', 'India', 2, 40, 4, ['bowl', '#e2a03f', '🍗 🌿 🍗'],
  'pollo:600 g|cebolla:2|tomate:2|yogur:1|curry:2 cucharadas|ajo:3 dientes|aceite:3 cucharadas|sal:al gusto', [
  ['mezclar', 'Marina el pollo troceado con el yogur, la mitad del curry y sal.', 'pollo yogur curry'],
  ['cortar', 'Pica las cebollas y el ajo, y ralla los tomates.', 'cebolla ajo tomate'],
  ['freir', 'Dora la cebolla a fuego medio 10 minutos. Añade el ajo, el resto del curry y el tomate.', 'cebolla ajo tomate'],
  ['hervir', 'Incorpora el pollo con su marinada y medio vaso de agua. Cuece tapado 20 minutos.', 'pollo'],
  ['emplatar', 'Sirve el curry con su salsa espesa y arroz basmati.']
]);
R('dal', 'Dal de lentejas', 'India', 1, 35, 4, ['bowl', '#e0a526', '🌿 🌶️'],
  'lentejas:300 g|cebolla:1|tomate:2|ajo:2 dientes|curry:1 cucharada|aceite:2 cucharadas|sal:al gusto', [
  ['hervir', 'Cuece las lentejas en 1 litro de agua durante 20 minutos, hasta que se deshagan.', 'lentejas'],
  ['cortar', 'Pica la cebolla, el ajo y los tomates.', 'cebolla ajo tomate'],
  ['freir', 'Sofríe la cebolla y el ajo, añade el curry y el tomate, y cocina 8 minutos.', 'cebolla ajo curry tomate'],
  ['mezclar', 'Vuelca el sofrito sobre las lentejas, sala y remueve hasta que quede cremoso.', 'lentejas'],
  ['emplatar', 'Sirve el dal bien caliente en cuencos.']
]);

/* ---------- Tailandesa ---------- */
R('currythai', 'Curry tailandés de pollo y coco', 'Tailandesa', 2, 30, 3, ['bowl', '#e8c25a', '🍗 🫑 🍃'],
  'pollo:400 g|coco:400 ml|curry:2 cucharadas de pasta|pimiento:1 rojo|albahaca:unas hojas|aceite:1 cucharada|sal:al gusto', [
  ['cortar', 'Corta el pollo en tiras y el pimiento en trozos.', 'pollo pimiento'],
  ['freir', 'Sofríe la pasta de curry 1 minuto. Añade el pollo y séllalo.', 'curry pollo'],
  ['hervir', 'Vierte la leche de coco, añade el pimiento y cuece 12 minutos a fuego suave.', 'coco pimiento'],
  ['emplatar', 'Termina con hojas de albahaca y sirve con arroz jazmín.']
]);
R('padthai', 'Pad thai de gambas', 'Tailandesa', 2, 30, 2, ['plate', '#d9a35b', '🍤 🥜 🍋 🍤'],
  'fideos:200 g de arroz|gambas:200 g|huevo:2|soja:3 cucharadas|limon:1|cacahuetes:un puñado|azucar:1 cucharada|aceite:2 cucharadas', [
  ['reposar', 'Hidrata los fideos en agua caliente durante 10 minutos y escúrrelos.', 'fideos'],
  ['mezclar', 'Mezcla la salsa de soja con el azúcar y el zumo de medio limón.', 'soja limon'],
  ['freir', 'Saltea las gambas 1 minuto, apártalas a un lado y cuaja los huevos revueltos.', 'gambas huevo'],
  ['freir', 'Añade los fideos y la salsa y saltea 2 minutos a fuego fuerte.', 'fideos soja'],
  ['emplatar', 'Sirve con cacahuetes picados y un gajo de limón.']
]);

/* ---------- Francesa ---------- */
R('ratatouille', 'Ratatouille', 'Francesa', 2, 60, 4, ['pan', '#c8553d', '🍆 🥒 🍅 🫑 🍆 🥒'],
  'berenjena:1|calabacin:1|tomate:4|pimiento:1|cebolla:1|ajo:2 dientes|aceite:4 cucharadas|sal:al gusto', [
  ['cortar', 'Corta la berenjena, el calabacín y dos tomates en rodajas finas.', 'berenjena calabacin tomate'],
  ['freir', 'Sofríe la cebolla, el ajo y el pimiento picados. Añade los otros dos tomates troceados y cocina 10 minutos.', 'cebolla ajo pimiento tomate'],
  ['mezclar', 'Extiende la salsa en una fuente y coloca encima las rodajas de verdura, alternándolas en espiral.', 'berenjena calabacin tomate', 'cortar'],
  ['hornear', 'Riega con aceite y sal, cubre con papel de horno y hornea 40 minutos a 180 grados.', 'berenjena calabacin tomate'],
  ['emplatar', 'Sirve la ratatouille caliente o templada.']
]);
R('omelette', 'Omelette francesa con queso', 'Francesa', 1, 10, 1, ['plate', '#f6d55c', '🧀 ☘️'],
  'huevo:3|mantequilla:15 g|queso:30 g rallado|sal:una pizca', [
  ['mezclar', 'Bate los huevos con una pizca de sal, solo lo justo para mezclarlos.', 'huevo'],
  ['freir', 'Funde la mantequilla a fuego medio y vierte los huevos. Remueve con una espátula hasta que cuajen por abajo.', 'mantequilla huevo'],
  ['freir', 'Reparte el queso, dobla la omelette sobre sí misma y cocina medio minuto más.', 'queso', 'huevos'],
  ['emplatar', 'Deslízala al plato: debe quedar jugosa por dentro.']
]);
R('crepes', 'Crêpes', 'Francesa', 2, 30, 4, ['plate', '#f1d9a0', '🍯 🧈'],
  'harina:125 g|huevo:2|leche:250 ml|mantequilla:30 g fundida|sal:una pizca', [
  ['triturar', 'Bate la harina, los huevos, la leche, la mantequilla fundida y la sal hasta que no queden grumos.', 'harina huevo leche'],
  ['reposar', 'Deja reposar la masa 15 minutos.', 'harina'],
  ['freir', 'Vierte un cucharón fino de masa en una sartén engrasada. Cuaja 1 minuto por cada lado.', 'mantequilla'],
  ['emplatar', 'Apílalas y sírvelas con el relleno dulce o salado que prefieras.']
]);

/* ---------- Griega ---------- */
R('griega', 'Ensalada griega', 'Griega', 1, 10, 2, ['bowl', '#f3efe2', '🍅 🥒 🧀 🫒 🧅 🍅'],
  'tomate:3|pepino:1|cebolla:media morada|queso:150 g de feta|aceitunas:un puñado|aceite:3 cucharadas|sal:al gusto', [
  ['cortar', 'Corta los tomates en gajos, el pepino en medias lunas y la cebolla en aros finos.', 'tomate pepino cebolla'],
  ['mezclar', 'Mezcla las verduras con las aceitunas, el aceite y la sal.', 'tomate pepino aceitunas'],
  ['emplatar', 'Corona con el queso feta en un bloque o en dados y sirve fresca.']
]);

/* ---------- Oriente Medio ---------- */
R('hummus', 'Hummus', 'Oriente Medio', 1, 10, 4, ['bowl', '#e6cf9c', '🫘 🌿 🍋'],
  'garbanzos:400 g|ajo:1 diente|limon:1|aceite:4 cucharadas|sal:al gusto|agua:3 cucharadas', [
  ['triturar', 'Tritura los garbanzos escurridos con el ajo, el zumo de limón, el aceite, la sal y el agua hasta obtener una crema lisa.', 'garbanzos ajo limon'],
  ['emplatar', 'Extiéndelo en un cuenco, haz un surco con la cuchara y riégalo con aceite. Sírvelo con pan.']
]);
R('shakshuka', 'Shakshuka', 'Oriente Medio', 1, 30, 2, ['pan', '#d1432b', '🍳 🍳 🌿 🍳'],
  'huevo:4|tomate:5 maduros|pimiento:1 rojo|cebolla:1|ajo:2 dientes|aceite:3 cucharadas|sal:al gusto', [
  ['cortar', 'Pica la cebolla, el pimiento y el ajo. Trocea los tomates.', 'cebolla pimiento ajo tomate'],
  ['freir', 'Pocha la cebolla y el pimiento 8 minutos. Añade el ajo y el tomate con sal y cocina 10 minutos más.', 'cebolla pimiento tomate'],
  ['freir', 'Haz cuatro huecos en la salsa, casca un huevo en cada uno, tapa y cuaja 5 minutos.', 'huevo'],
  ['emplatar', 'Lleva la sartén a la mesa y sirve con pan para mojar.']
]);

/* ---------- Americana ---------- */
R('hamburguesa', 'Hamburguesa clásica', 'Americana', 1, 20, 2, ['plate', '#c98a4b', '🍔 🍅 🧀'],
  'ternera:300 g picada|pan:2 de hamburguesa|queso:2 lonchas|tomate:1|cebolla:media|sal:al gusto|pimienta:al gusto', [
  ['mezclar', 'Forma dos hamburguesas con la carne, sin amasar demasiado, y salpimiéntalas.', 'ternera', 'cortar-carne'],
  ['cortar', 'Corta el tomate y la cebolla en rodajas.', 'tomate cebolla'],
  ['freir', 'Cocina las hamburguesas 3 minutos por cada lado a fuego fuerte. Pon el queso encima en el último minuto.', 'ternera queso'],
  ['freir', 'Tuesta ligeramente el pan abierto en la misma sartén.', 'pan'],
  ['emplatar', 'Monta la hamburguesa: pan, carne con queso, tomate, cebolla y tapa.']
]);
R('maccheese', 'Macarrones con queso', 'Americana', 1, 30, 3, ['bowl', '#f5b82e', '🧀 🧀'],
  'pasta:300 g de macarrones|queso:200 g rallado|leche:400 ml|mantequilla:30 g|harina:30 g|sal:al gusto', [
  ['hervir', 'Cuece los macarrones en agua con sal y escúrrelos.', 'pasta'],
  ['freir', 'Funde la mantequilla, añade la harina y cocina 1 minuto sin dejar de remover.', 'mantequilla harina', 'mezclar'],
  ['hervir', 'Vierte la leche poco a poco, removiendo, hasta obtener una bechamel ligera.', 'leche', 'mezclar'],
  ['mezclar', 'Funde el queso en la salsa y mézclala con los macarrones.', 'queso pasta'],
  ['emplatar', 'Sirve bien caliente y cremoso.']
]);
R('tortitas', 'Tortitas americanas', 'Americana', 1, 20, 3, ['plate', '#e2b56b', '🥞 🍯 🧈'],
  'harina:200 g|huevo:1|leche:250 ml|mantequilla:30 g|miel:al gusto|azucar:1 cucharada|sal:una pizca', [
  ['mezclar', 'Mezcla la harina, el azúcar y la sal. Añade el huevo, la leche y la mantequilla fundida y bate lo justo.', 'harina huevo leche'],
  ['freir', 'Vierte pequeños círculos de masa en una sartén engrasada a fuego medio.', 'mantequilla'],
  ['freir', 'Cuando salgan burbujas en la superficie, dales la vuelta y dóralas 1 minuto más.', 'harina'],
  ['emplatar', 'Apila las tortitas y báñalas con miel.']
]);

/* ---------- Peruana ---------- */
R('ceviche', 'Ceviche de pescado', 'Peruana', 2, 20, 2, ['bowl', '#f2ead3', '🐟 🧅 🌿 🌶️ 🍋'],
  'pescado:400 g muy fresco, previamente congelado|limon:6 limas|cebolla:1 morada|cilantro:un manojo|guindilla:1|sal:al gusto', [
  ['cortar', 'Corta el pescado en dados de 2 centímetros. Corta la cebolla en juliana muy fina y pica el cilantro y la guindilla.', 'pescado cebolla cilantro guindilla'],
  ['mezclar', 'Sala el pescado y cúbrelo con el zumo de las limas recién exprimidas.', 'pescado limon'],
  ['reposar', 'Añade la cebolla, la guindilla y el cilantro y deja marinar solo 5 minutos.', 'cebolla cilantro'],
  ['emplatar', 'Sirve de inmediato, muy frío, con su jugo.']
]);
R('lomosaltado', 'Lomo saltado', 'Peruana', 2, 35, 2, ['plate', '#b5651d', '🥩 🍅 🍟 🧅'],
  'ternera:300 g de lomo|cebolla:1 morada|tomate:2|patata:2|soja:3 cucharadas|aceite:abundante|sal:al gusto', [
  ['cortar', 'Corta la ternera en tiras, la cebolla y el tomate en gajos gruesos y las patatas en bastones.', 'ternera cebolla tomate patata'],
  ['freir', 'Fríe las patatas en abundante aceite hasta que estén doradas y resérvalas.', 'patata'],
  ['freir', 'Saltea la carne a fuego muy fuerte durante 2 minutos. Añade la cebolla y el tomate y saltea 1 minuto más.', 'ternera cebolla tomate'],
  ['mezclar', 'Vierte la salsa de soja, mezcla y añade las patatas fritas al final.', 'soja patata', 'wok'],
  ['emplatar', 'Sirve al momento, acompañado de arroz blanco si quieres.']
]);
