export default function Bookmark() {
    return (
        <div class="bookmark--card relative">
            <div class="bookmark--header">
                <h2 class="bookmark--title text-xl font-bold md:text-2xl">
                    <a href="#" target="_blank" class="text-blue-400 underline-offset-4 hover:underline">
                        <div
                            class="inline-block w-fit underline-offset-4 duration-100 ease-in-out hover:underline active:scale-125"
                        >
                            Title
                        </div></a
                    >, by Author (2025)
                </h2>
            </div>
            <p class="text-sm md:text-base">A description of the example website.</p>
            <div class="bookmark--footer text-dark-tx-2 w-full text-sm md:text-base">
                <p class="text-sm md:text-base">24 de outubro de 2025</p>
                <div class="dot"></div>
                <div class="bookmark--tags w-full">
                    <span class="bookmark--tag">#tag</span>
                    <span class="bookmark--tag">#tag</span>
                    <span class="bookmark--tag">#tag</span>
                </div>
            </div>
        </div>
    )
}
