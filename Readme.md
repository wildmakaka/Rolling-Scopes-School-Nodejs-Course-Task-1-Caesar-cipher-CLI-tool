# Rolling-Scopes-School-Nodejs-Course-Task-1-Caesar-cipher-CLI-tool

<br/>

### Базовая реализация

:heavy_check_mark: В README.md должно быть описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению

Ниже по тексту

<br/>

:heavy_check_mark: Если переданы все аргументы, приложение читает из файла и записывает в файл зашифрованный/расшифрованный текст, при этом предыдущие записи не удаляются

2 раза выполняю

    $ node src/my_caesar_cli.js --action encode --shift 1 --input plain.txt --output encoded.txt

<br/>

Текст добавляется и не перезаписывается.

<br/>

![Application](/img/pic-01.png?raw=true)

<br/>

:heavy_check_mark: action (-a, --action) encode и decode работают в соответствии с описанными в задаче примерами

    $ node src/my_caesar_cli.js --action decode --shift 1 --input encoded.txt --output decoded.txt

<br/>

Получили decode ранее закодированного текста.

<br/>

![Application](/img/pic-02.png?raw=true)

<br/>

:heavy_check_mark: Если не переданы обязательные аргументы, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0

Выполняю запуск без обязательного параметра action

    $ node src/my_caesar_cli.js  --shift 1 --input encoded.txt --output decoded.txt

<br/>

![Application](/img/pic-03.png?raw=true)

<br/>

:x: Если переданы аргументы с путями к файлам, но файлы отсутствуют (или к ним невозможен доступ), приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0

    $ node src/my_caesar_cli.js --action decode --shift 1 --input encoded.txt --output decoded1.txt

<br/>

![Application](/img/pic-04.png?raw=true)

<br/>

:heavy_check_mark: Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin

<br/>

    $ node src/my_caesar_cli.js --action decode --shift 1 --output decoded.txt

<br/>

![Application](/img/pic-05.png?raw=true)

<br/>

:heavy_check_mark: Если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout

    $ node src/my_caesar_cli.js --action encode --shift 1 --input plain.txt

<br/>

![Application](/img/pic-06.png?raw=true)

<br/>

:heavy_check_mark: Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются

<br/>

См. предыдущие скриншоты

<br/>

:heavy_check_mark: Если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст

<br/>

См. скриншот выше

<br/>

:heavy_check_mark: Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.)

<br/>

_3 файла:_

```
my_caesar_cli.js
utils/constants.js
utils/utils.js
```

:heavy_check_mark: Поддерживаются значения shift (-s, --shift) большие, чем длина алфавита (в этом случае алфавит проходится циклически)

<br/>

    $ node src/my_caesar_cli.js --action encode --shift 26

<br/>

![Application](/img/pic-07.png?raw=true)

<br/>

    $ node src/my_caesar_cli.js --action encode --shift 27

<br/>

![Application](/img/pic-08.png?raw=true)

<br/>

### Продвинутая реализация

:heavy_check_mark: Поддерживаются отрицательные значения shift (-s, --shift) (в этом случае сдвиг должен осуществляться в обратную сторону)

<br/>

    $ node src/my_caesar_cli.js --action decode -s-1 --input plain.txt --output decoded.txt

<br/>

![Application](/img/pic-09.png?raw=true)

<br/>

    $ node src/my_caesar_cli.js --action encode -s-1 --input decoded.txt --output encoded.txt

<br/>

![Application](/img/pic-10.png?raw=true)

<br/>

### Окружение в котором разрабатывалось:

Ubuntu 20.04.02 LTS

<br/>

    $ node --version
    v14.16.1

<br/>

### Подготовка

    $ cd app/
    $ npm install

<br/>

Для запуска программы, нужно находиться в каталоге app.

Программа запускается выполнением

    $ node src/my_caesar_cli.js + Аргументы, передаваемые программе.

<br/>

Аргументы могуть быть:

```
-a, --action - encode/decode
-s, --shift - смещение относительно текущей буквы алфавита.
-i, --input - файл откда брать данные.
-o, --output - файл куда следует записать результаты.
```

<br/>

```
action и shift обязательные.
input и outputh - необязательные.
```

<br/>

В каталоге src лежит файл plain.txt с подготовленными данными.
