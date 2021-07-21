Из файлов `sprite-svg/svg/` генерируется файл спрайта `sprite-svg/img/sprite.svg`.

Для вставки на страницу используйте <code>svg &gt; use</code> со ссылками на <code>id</code> символа:

<pre class="code">
  <code>svg(width="32", height="32")</code>
  <code>  use(xlink:href="img/sprite.svg#icon-boo")</code>
</pre>

<p class="alert alert--warning">Чтобы использовать ссылки на внешние svg-файлы со спрайтами в IE, используйте <a href="https://www.npmjs.com/package/svg4everybody">svg4everybody</a>.</p>
