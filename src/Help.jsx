export default function Help(){
    return(
        <article className="help-section">
            <h1>Color Generator App</h1>
        
        <p>
             A simple tool to generate color palettes for your creative projects. Explore different color schemes, lock colors you love.</p>

<section>
    <h2>How to use</h2>
    <ul>
    <li>Select a color scheme from the dropdown menu. Schemes from Monochrome to Quad require you to pick a base color using the color picker. Everything else generates automatically.</li>
    <li>Press the “Get color scheme” button to generate a color scheme	</li>
    <li>You can lock, unlock, or remove individual colors. Locking a color keeps it in place when you regenerate the palette.</li>
    
    <li> Use the color count to choose how many colors appear in your palette, between 1 and 20. Note that locked colors count toward this number — so if you have 5 colors, lock 2, and regenerate with a count of 5, only 3 new colors will appear alongside your locked one</li>
    <li>Use the color format menu to display color values in your preferred format — HEX, RGB, or others.</li>
    <li>Each color has a copy button that copies the color value in the format as selected in the color format menu.</li>
    </ul>
    <p>Note: Currently the app does not support exporting colors directly. You can screenshot or note down the values you want to keep.</p>
</section>

<section>
<h2>Color schemes</h2>

<ul>

<li>Random — a mix of unexpected colors, good for inspiration or breaking out of a rut. </li>
<li>Pastel — soft, muted tones. Good for gentle, calm designs. </li>
<li>Neon — bold and bright. Good for high energy or digital designs. </li>
<li>Earthy — warm, natural tones inspired by nature. </li>
<li>Jewel — rich, saturated tones. Good for elegant or luxurious feels. </li>
<li>Muted — subdued, sophisticated tones. </li>
<li>*Monochrome / *Monochrome-dark / *Monochrome-light — variations of a single base color you choose. </li>
<li>*Analogic — colors that sit near each other on the color wheel. Good for harmonious, cohesive palettes.</li>
<li>*Complement — opposite colors on the color wheel. Good for contrast and visual interest. </li>
<li>*Analogic-complement — a mix of analogous and complementary colors.</li>
<li>*Triad — three evenly spaced colors on the color wheel. Good for balanced, vibrant palettes. </li>
<li>*Quad — four evenly spaced colors. Good for complex, varied palettes.</li>

</ul>
<p>* Requires a base color selection from the color picker.</p>
</section>
        </article>
    )
}