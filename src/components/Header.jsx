import InputBar from './InputBar'

export default function Header() {
    return (
        <header class="flex flex-col items-center justify-center w-[75%] m-auto max-w-[900px] p-8">
            <h1 class="font-heading my-24 text-5xl font-bold text-yellow-400">My Bookmarks</h1>
            <div class="flex flex-col w-full gap-4">
                <InputBar id='url' type='text' placeholder='Paste URL' />
                <InputBar id='search' type='search' placeholder='Search...' />
            </div>
        </header>
    )
}


