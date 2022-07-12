# Renderização  ![kindpng_1474690_3_20](https://user-images.githubusercontent.com/38790522/168130227-deb4c722-ea6d-4943-a700-b8e55bc9932f.png)

###   ![computer](https://user-images.githubusercontent.com/38790522/87855074-4f825500-c8ec-11ea-8bfb-604cd6efc3ae.png) Projeto

Renderização é um projeto em [Three.JS](https://threejs.org/) e [React-three-fiber](https://github.com/pmndrs/react-three-fiber) que permite visualizar alguns conceitos de algoritmos de iluminação local. A ideia deste projeto é "simular" a exposição de alguns modelos utilizados para análise de Computação Gráfica através de técnicas que podem ser aplicadas para aumentar o realismo dos modelos. A inspiração deste projeto vem de um dos mais famosos eventos de carros do mundo, o [Salão de Genebra](https://pt.wikipedia.org/wiki/Sal%C3%A3o_Internacional_do_Autom%C3%B3vel_de_Genebra). Também chamado de "Salão dos supercarros", este evento reúne as marcas mais famosas do mundo, possibilitando ver os modelos de carros mais incríveis feitos por essas empresas. Neste projeto existem basicamente três modelos:


- **[Suzzane](https://github.com/jeromeetienne/threex.suzanne)**<br>
Suzanne é um clássico modelo de um macaco 3d muito utilizado pelos usuários do [blender](https://www.blender.org/). Ela é mais precisamente um modelo 3D de uma cabeça de chimpanzé.
- **[Lamborghini urus](https://www.lamborghini.com/en-en/models/urus)**<br>
O Lamborghini Urus é o primeiro veículo utilitário superesportivo do mundo a fundir a alma de um supercarro esportivo com a funcionalidade de um SUV. Alimentado por um motor V8 biturbo de 4,0 litros que produz 650 CV e 850 Nm de torque, o Urus acelera de 0 a 100 km/h em 3,6 segundos e atinge uma velocidade máxima de 300 km/h. O design, o desempenho, a dinâmica de condução e a emoção de condução fluem sem esforço nesta abordagem visionária do DNA Lamborghini.
- **[Stanford Dragon](https://en.wikipedia.org/wiki/Stanford_dragon)**<br>
O dragão de Stanford é um modelo de teste 3D de computação gráfica criado na Universidade de Stanford. O dragão consiste em dados que descrevem 871.414 triângulos determinados por escaneamento 3D de uma estatueta real e foram produzidos em 1996. O conjunto de dados é frequentemente usado para testar vários algoritmos gráficos, incluindo simplificação poligonal, compactação e suavização de superfície.

### ![green-checkmark-line-removebg-preview_3_5](https://user-images.githubusercontent.com/38790522/168135362-5c5d5eec-dc58-458a-8d30-11eb582f5556.png) Solução Utilizada
 Para se ter um efeito bem iluminado, assim como no salão de Genebra, foram utilizadas um conjunto de técnicas para adequação dos modelos ao ambiente. Para a iluminação geral, foi utilizado o [spotlight](https://github.com/pmndrs/drei#spotlight), ou seja, uma luz que é emitida de um único ponto em uma direção, ao longo de um cone que aumenta de tamanho à medida que se afasta da luz, e está posicionada acima dos modelos. Juntamente com o [spotlight](https://github.com/pmndrs/drei#spotlight), existe também o [light former](https://github.com/pmndrs/drei#lightformer). Este componente desenha retângulos planos, círculos ou anéis, imitando a aparência de um formador de luz. Com ele, é possível definir a intensidade de saída, o que afetará a emissividade quando colocarmos em um [HDRI](https://vrender.com/what-is-hdri/) \<Environment>\, onde ele pertence principalmente, e com isso ele funcionará como uma "luz real". Com a combinação dessas duas técnicas, é possível adicionar uma [contact shadow](https://github.com/pmndrs/drei#contactshadows). Adicionar a [contact shadow](https://github.com/pmndrs/drei#contactshadows) é uma ótima maneira de melhorar a profundidade visual e a fidelidade da cena, pois ela fornece uma aproximação mais precisa do sombreamento, permitindo a adição de sombra com contornos que pode não ser alcançada com outros algoritmos de sombreamento. Existe uma luz vermelha no "lado esquerdo" dos modelos, também utilizando o [light former](https://github.com/pmndrs/drei#lightformer), que simboliza eventuais luzes de outros objetos que poderiam estar na cena, como por exemplo, outros carros. Existe ainda uma última luz e que também utiliza o [light former](https://github.com/pmndrs/drei#lightformer). Essa última luz, ou um conjunto de várias luzes, nos dar a ideia de um refletor que passa de tempos em tempos acima dos modelos. Porém, esse efeito depende de um outro detalhe para dar um aspecto bacana, o [mapeamento de textura](https://pt.wikipedia.org/wiki/Mapeamento_de_textura). Nesse momento, o ponto chave da inspiração do salão de Genebra entra em ação, pois neste evento, os carros que são mostrados possuem um aspecto bastante metalizado, fazendo com que estas luzes tenham uma intensidade maior quando "enconstam" nos modelos. Para dar este efeito, é utilizado o shader [mesh reflector material](https://github.com/pmndrs/drei#meshreflectormaterial), fazendo com que esta ideia se torne mais "realista". Este material se estende de THREE.MeshStandardMaterial e aceita todas as suas propriedades. Existe ainda na cena uma cortina ao fundo, dando a ideia realmente de apresentação dos modelos. Essa cortina foi feita através do [backdrop](https://github.com/pmndrs/drei#backdrop). Isso é voltado justamente para fins de apresentação, ou seja, para quebrar a luz e as sombras de forma mais interessante. E por fim. temos a câmera utilizada, que nesse caso é utilizado um ponto inicial e a partir dele é feito um loop por vários outros pontos da cena, fazendo com que realmente se assemelhe a uma apresentação de todos os modelos. Para isso é utilizada a função criada chamada de "CameraMovements". Ela mapeia um conjunto de pontos da cena e gera a visão a partir de um ponto específico e assim sucessivamente para todos os outros pontos. Com isso, não é possivel modificar a visão dos modelos manualmente, isto é, todos os movimentos da câmera são pré-configurados e setados automaticamente.



###  ![innovation (1)](https://user-images.githubusercontent.com/38790522/87854016-024eb500-c8e5-11ea-8d88-379cc4341e51.png) Bibliotecas e tecnologias utilizadas: 
- [HTML;](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS;](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript;](https://www.javascript.com/)
- [Three JS;](https://threejs.org/)
- [NodeJS;](https://nodejs.org/en/)
- [ReactJS;](https://pt-br.reactjs.org/)
- [React-three-fiber;](https://github.com/pmndrs/react-three-fiber)
- [Lamina;](https://www.npmjs.com/package/lamina)
- [Draco;](https://google.github.io/draco/)

### <img src="https://img.icons8.com/color/30/000000/command-line.png"/> Como executar a aplicaçao

Para executar esta aplicação, é necessário ter o [Node.JS](https://nodejs.org/en/) instalado na sua máquina.

A partir da sua linha de comando:

>Faça um clone deste repositório

```sh
$ git clone https://github.com/AlbertoLucass/Atividade-02-CG-Renderizacao.git
```

>Em seguida


```sh
# Acesse a pasta da aplicação através da linha de comando
$ cd Atividade-02-CG-Renderizacao

# Execute a aplicação em modo de desenvolvimento
$ npm start
```
A aplicação será executada em um servidor. Caso não abra automaticamente, acesse [http://localhost:3000/](http://localhost:3000/).

A versão online pode ser encontrada [aqui](https://atividade-02-cg-renderizacao.vercel.app/).

![pc](https://user-images.githubusercontent.com/38790522/174317161-156b0bfa-6d75-4c37-abbc-173032dc7878.jpg)

![img](https://user-images.githubusercontent.com/38790522/174309865-6b2e2d3a-b74a-4b72-a781-58e03c867e3a.png)

