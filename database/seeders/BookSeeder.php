<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data =[
            // ID 1
            [
                "book_title" => "The Great Gatsby",
                "book_author" => "F. Scott Fitzgerald",
                "book_cover_url" => Storage::url("books/1.jpg"),
                "book_description" => "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink",
                "book_publish_date" => "1925-04-10",
                "book_page" => 180,
                "publisher_id" => 1
            ],
            // ID 2
            [
                "book_title" => "To Kill a Mockingbird",
                "book_author" => "Harper Lee",
                "book_cover_url" => Storage::url("books/2.jpg"),
                "book_description" => "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.",
                "book_publish_date" => "1960-07-11",
                "book_page" => 281,
                "publisher_id" => 2
            ],
            // ID 3
            [
                "book_title" => "1984",
                "book_author" => "George Orwell",
                "book_cover_url" => Storage::url("books/3.jpg"),
                "book_description" => "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmare vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality.",
                "book_publish_date" => "1949-06-08",
                "book_page" => 449,
                "publisher_id" => 3
            ],
            // ID 4
            [
                "book_title" => "The Catcher in the Rye",
                "book_author" => "J.D. Salinger",
                "book_cover_url" => Storage::url("books/4.jpg"),
                "book_description" => "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.",
                "book_publish_date" => "1951-07-16",
                "book_page" => 277,
                "publisher_id" => 4
            ],
            // ID 5
            [
                "book_title" => "Brave New World",
                "book_author" => "Aldous Huxley",
                "book_cover_url" => Storage::url('books/5.jpg'),
                "book_description" => "Aldous Huxley's profoundly important classic of world literature, Brave New World is a searching vision of an unequal, technologically-advanced future where humans are genetically bred, socially indoctrinated, and pharmaceutically anesthetized to passively uphold an authoritarian ruling order--all at the cost of our freedom, full humanity, and perhaps also our souls.",
                "book_publish_date" => "1932-10-17",
                "book_page" => 259,
                "publisher_id" => 5
            ],
            // ID 6
            [
                "book_title" => "The Grapes of Wrath",
                "book_author" => "John Steinbeck",
                "book_cover_url" => Storage::url("books/6.jpg"),
                "book_description" => "The Pulitzer Prize-winning epic of the Great Depression, a book that galvanized—and sometimes outraged—millions of readers. First published in 1939, Steinbeck’s Pulitzer Prize-winning epic of the Great Depression chronicles the Dust Bowl migration of the 1930s and tells the story of one Oklahoma farm family, the Joads—driven from their homestead and forced to travel west to the promised land of California.",
                "book_publish_date" => "1939-04-14",
                "book_page" => 464,
                "publisher_id" => 2
            ],
            // ID 7
            [
                "book_title" => "The Lord of the Rings",
                "book_author" => "John Ronald Reuel Tolkien",
                "book_cover_url" => Storage::url("books/7.jpg"),
                "book_description" => "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.",
                "book_publish_date" => "1954-07-29",
                "book_page" => 1178,
                "publisher_id" => 1
            ],
            // ID 8
            [
                "book_tile" => "Thinking, Fast and Slow",
                "book_author" => "Daniel Kahneman",
                "book_cover_url" => Storage::url("books/8.jpg"),
                "book_description" => "In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
                "book_publish_date" => "2011-10-25",
                "book_page" => 499,
                "publisher_id" => 2
            ],
            // ID 9
            [
                "book_tile" => "The Alchemist",
                "book_author" => "Paulo Coelho",
                "book_cover_url" => Storage::url("books/9.jpg"),
                "book_description" => "The Alchemist is a story of following one's dreams to find one's purpose in life. The main character, Santiago, is a Spanish shepherd boy who leaves behind his job and family to search for his Personal Legend, a hidden treasure that he believes is buried near the pyramids in Egypt.",
                "book_publish_date" => "1988-01-01",
                "book_page" => 137,
                "publisher_id" => 3
            ],
            // ID 10
            [
                "book_tile" => "The Da Vinci Code",
                "book_author" => "Dan Brown",
                "book_cover_url" => Storage::url("books/10.jpg"),
                "book_description" => "The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown. It follows symbologist Robert Langdon and cryptologist Sophie Neveu",
                "book_publish_date" => "2003-03-18",
                "book_page" => 689,
                "publisher_id" => 4
            ],
            // ID 11
            [
                "book_title" => "The Brothers Karamazov",
                "book_author" => "Fyodor Dostoevsky",
                "book_cover_url" => Storage::url("books/11.jpg"),
                "book_description" => "The Brothers Karamazov is a passionate philosophical novel set in 19th century Russia, that enters deeply into the ethical debates of God, free will, and morality. It is a spiritual drama of moral struggles concerning faith, doubt, and reason, set against a modernizing Russia.",
                "book_publish_date" => "1880-11-05",
                "book_page" => 796,
                "publisher_id" => 5
            ],
            // ID 12
            [
                "book_title" => "The Picture of Dorian Gray",
                "book_author" => "Oscar Wilde",
                "book_cover_url" => Storage::url("books/12.jpg"),
                "book_description" => "The Picture of Dorian Gray is a Gothic and philosophical novel by Oscar Wilde, first published complete in the July 1890 issue of Lippincott's Monthly Magazine. Fearing the story was indecent, the magazine's editor deleted roughly five hundred words before publication without Wilde's knowledge.",
                "book_publish_date" => "1890-07-01",
                "book_page" => 254,
                "publisher_id" => 4
            ],
            // ID 13
            [
                "book_title" => "Epistulae Morales ad Lucilium",
                "book_author" => "Seneca the Younger",
                "book_cover_url" => Storage::url("books/13.jpg"),
                "book_description" => "The Epistulae Morales ad Lucilium is a collection of 124 letters which were written by Seneca the Younger at the end of his life. They are addressed to Lucilius, the then procurator of Sicily, although he is known only through Seneca's writings.",
                "book_publish_date" => "2020-02-11",
                "book_page" => 416,
                "publisher_id" => 1
            ],
            // ID 14
            [
                "book_title" => "This Could Be Us",
                "book_author" => "Kennedy Ryan",
                "book_cover_url" => Storage::url("books/14.jpg"),
                "book_description" => "This Could Be Us is a collection of poetry and prose that explores the complexities of love and longing. A reflection on the idea that a single moment can alter the course of a life, This Could Be Us is a testament to the fact that there are no coincidences.",
                "book_publish_date" => "2024-07-09",
                "book_page" => 300,
                "publisher_id" => 2
            ],
            // ID 15
            [
                "book_title" => "Gone Girl",
                "book_author" => "Gillian Flynn",
                "book_cover_url" => Storage::url("books/15.jpg"),
                "book_description" => "Gone Girl is about a woman who frames her husband for her disappearance. She is actually in hiding and has concocted an elaborate plan to punish him for his infidelity.",
                "book_publish_date" => "2012-06-05",
                "book_page" => 432,
                "publisher_id" => 1
            ],
            // ID 16
            [
                "book_title" => "Fight Club",
                "book_author" => "Chuck Palahniuk",
                "book_cover_url" => Storage::url("books/16.jpg"),
                "book_description" => "Fight Club is a 1996 novel by Chuck Palahniuk. It follows the experiences of an unnamed protagonist struggling with insomnia. Inspired by his doctor's exasperated remark that insomnia is not suffering, the protagonist finds relief by impersonating a seriously ill person in several support groups.",
                "book_publish_date" => "1996-08-17",
                "book_page" => 218,
                "publisher_id" => 1
            ],
            // ID 17
            [
                "book_title" => "American Psycho",
                "book_author" => "Bret Easton Ellis",
                "book_cover_url" => Storage::url("books/17.jpg"),
                "book_description" => "American Psycho is a novel by Bret Easton Ellis, published in 1991. The story is told in the first person by Patrick Bateman, a serial killer and Manhattan businessman. Alison Kelly of The Observer notes that while some countries (such as the United Kingdom and Australia) have 'banned' the film, the novel is not considered 'obscene' and is openly sold.",
                "book_publish_date" => "1991-03-14",
                "book_page" => 399,
                "publisher_id" => 1
            ],
            // ID 18
            [
                "book_title" => "Dune",
                "book_author" => "Frank Herbert",
                "book_cover_url" => Storage::url("books/18.jpg"),
                "book_description" => "Dune is a 1965 science fiction novel by American author Frank Herbert, originally published as two separate serials in Analog magazine. It tied with Roger Zelazny's This Immortal for the Hugo Award in 1966, and it won the inaugural Nebula Award for Best Novel.",
                "book_publish_date" => "1965-08-01",
                "book_page" => 412,
                "publisher_id" => 5
            ],
            // ID 19
            [
                "book_title" => "The Hunger Games",
                "book_author" => "Suzanne Collins",
                "book_cover_url" => Storage::url("books/19.jpg"),
                "book_description" => "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America.",
                "book_publish_date" => "2008-09-14",
                "book_page" => 386,
                "publisher_id" => 1
            ],
            // ID 20
            [
                "book_title" => "The Witcher",
                "book_author" => "Andrzej Sapkowski",
                "book_cover_url" => Storage::url("books/20.jpg"),
                "book_description" => "The Witcher is a series of fantasy novels and short stories written by Polish author Andrzej Sapkowski. The series revolves around the eponymous witcher, Geralt of Rivia. In Sapkowski's books, witchers are monster hunters who develop supernatural abilities at a young age to battle deadly beasts.",
                "book_publish_date" => "1994-11-02",
                "book_page" => 288,
                "publisher_id" => 3
            ],
            // ID 21
            [
                "book_title" => "It",
                "book_author" => "Stephen King",
                "book_cover_url" => Storage::url("books/21.jpg"),
                "book_description" => "It is a 1986 horror novel by American author Stephen King. It was his 22nd book and 18th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.",
                "book_publish_date" => "1986-09-15",
                "book_page" => 1138,
                "publisher_id" => 4
            ],
            // ID 22
            [
                "book_title" => "The Shining",
                "book_author" => "Stephen King",
                "book_cover_url" => Storage::url("books/22.jpg"),
                "book_description" => "The Shining is a horror novel by American author Stephen King. Published in 1977, it is King's third published novel and first hardback bestseller: the success of the book firmly established King as a preeminent author in the horror genre.",
                "book_publish_date" => "1977-01-28",
                "book_page" => 447,
                "publisher_id" => 5
            ],
            // ID 23
            [
                "book_title" => "The Godfather",
                "book_author" => "Mario Puzo",
                "book_cover_url" => Storage::url("books/23.jpg"),
                "book_description" => "The Godfather by Mario Puzo is a gripping novel that takes us into the world of organized crime. It follows the Corleone family as they navigate power, loyalty, and betrayal in their pursuit of success and ultimately, survival.",
                "book_publish_date" => "1969-03-10",
                "book_page" => 610,
                "publisher_id" => 2
            ],
            // 24
            [
                "book_title" => "No Country For Old Men",
                "book_author" => "Cormac McCarthy",
                "book_cover_url" => Storage::url("books/24.jpg"),
                "book_description" => "No Country for Old Men is a 2005 novel by American author Cormac McCarthy, who had originally written the story as a screenplay. The story occurs in the vicinity of the Mexico–United States border in 1980 and concerns an illegal drug deal gone awry in the Texas desert back country.",
                "book_publish_date" => "2005-07-19",
                "book_page" => 309,
                "publisher_id" => 1
            ],
            // ID 25
            [
                "book_title" => "Charlie and the Chocolate Factory",
                "book_author" => "Roald Dahl",
                "book_cover_url" => Storage::url("books/25.jpg"),
                "book_description" => "Charlie and the Chocolate Factory is a 1964 children's novel by British author Roald Dahl. The story features the adventures of young Charlie Bucket inside the chocolate factory of eccentric chocolatier Willy Wonka.",
                "book_publish_date" => "1964-01-17",
                "book_page" => 155,
                "publisher_id" => 2
            ],
            // ID 26
            [
                "book_title" => "The Sixth Extinction: An Unnatural History",
                "book_author" => "Elizabeth Kolbert",
                "book_cover_url" => Storage::url("books/26.jpg"),
                "book_description" => "The Sixth Extinction: An Unnatural History is a 2014 non-fiction book written by Elizabeth Kolbert and published by Henry Holt and Company. The book argues that the Earth is in the midst of a modern, man-made, sixth extinction.",
                "book_publish_date" => "2014-02-11",
                "book_page" => 319,
                "publisher_id" => 3
            ],
            // ID 27
            [
                "book_title" => "The Road",
                "book_author" => "Cormac McCarthy",
                "book_cover_url" => Storage::url("books/27.jpg"),
                "book_description" => "The Road is a 2006 post-apocalyptic novel by American writer Cormac McCarthy. The book details the journey of a father and his young son over a period of several months across a landscape blasted by an unspecified cataclysm that has destroyed most of civilization and, in the intervening years, almost all life on Earth.",
                "book_publish_date" => "2006-09-26",
                "book_page" => 287,
                "publisher_id" => 4
            ],
            [
                "book_title" => "The Stand",
                "book_author" => "Stephen King",
                "book_cover_url" => Storage::url("books/28.jpg"),
                "book_description" => "The Stand is a post-apocalyptic dark fantasy novel written by American author Stephen King and first published in 1978 by Doubleday. The plot centers on a pandemic of a weaponized strain of influenza that kills almost the entire world population.",
                "book_publish_date" => "1978-10-03",
                "book_page" => 823,
                "publisher_id" => 5
            ],
            [
                "book_title" => "The Hobbit",
                "book_author" => "J.R.R. Tolkien",
                "book_cover_url" => Storage::url("books/29.jpg"),
                "book_description" => "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
                "book_publish_date" => "1937-09-21",
                "book_page" => 310,
                "publisher_id" => 1
            ],
            [
                "book_title" => "Don Quixote",
                "book_author" => "Miguel de Cervantes",
                "book_cover_url" => Storage::url("books/30.jpg"),
                "book_description" => "Don Quixote, fully titled The Ingenious Gentleman Don Quixote of La Mancha, is a Spanish novel by Miguel de Cervantes. It was published in two parts in 1605 and 1615. The novel follows the adventures of Alonso Quijano, a hidalgo who reads so many chivalric novels that he decides to set out to revive chivalry, under the name Don Quixote.",
                "book_publish_date" => "1605-01-16",
                "book_page" => 863,
                "publisher_id" => 2
            ],
            [
                "book_title" => "The Odyssey",
                "book_author" => "Homer",
                "book_cover_url" => Storage::url("books/31.jpg"),
                "book_description" => "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is one of the oldest extant works of Western literature, and its written version is usually dated to around the 8th century BC.",
                "book_publish_date" => "800-01-01",
                "book_page" => 475,
                "publisher_id" => 3
            ],
            [
                "book_title" => "Slaughterhouse-Five",
                "book_author" => "Kurt Vonnegut",
                "book_cover_url" => Storage::url("books/32.jpg"),
                "book_description" => "Slaughterhouse-Five, or The Children's Crusade: A Duty-Dance with Death is a science fiction-infused anti-war novel by Kurt Vonnegut, first published in 1969. It follows the life and experiences of Billy Pilgrim, from his early years to his time as an American soldier and chaplain's assistant during World War II, to the postwar years, with Billy occasionally traveling through time.",
                "book_publish_date" => "1969-03-31",
                "book_page" => 275,
                "publisher_id" => 2
            ],
            [
                "book_title" => "Little Women",
                "book_author" => "Louisa May Alcott",
                "book_cover_url" => Storage::url("books/33.jpg"),
                "book_description" => "Little Women is a coming-of-age novel written by American novelist Louisa May Alcott, originally published in two volumes in 1868 and 1869. The story follows the lives of the four March sisters—Meg, Jo, Beth, and Amy—and details their passage from childhood to womanhood.",
                "book_publish_date" => "1868-09-30",
                "book_page" => 449,
                "publisher_id" => 1
            ],
            [
                "book_title" => "The Adventures of Huckleberry Finn",
                "book_author" => "Mark Twain",
                "book_cover_url" => Storage::url("books/34.jpg"),
                "book_description" => "Adventures of Huckleberry Finn is a novel by Mark Twain, first published in the United Kingdom in December 1884 and in the United States in February 1885. It is told in the first person by Huckleberry 'Huck' Finn, the narrator of two other Twain novels and a friend of Tom Sawyer.",
                "book_publish_date" => "1884-12-10",
                "book_page" => 366,
                "publisher_id" => 4
            ],
            [
                "book_title" => "Dracula",
                "book_author" => "Bram Stoker",
                "book_cover_url" => Storage::url("books/35.jpg"),
                "book_description" => "Dracula is an 1897 Gothic horror novel by Irish author Bram Stoker. It introduced the character of Count Dracula and established many conventions of subsequent vampire fantasy. The novel tells the story of Dracula's attempt to move from Transylvania to England so that he may find new blood and spread the undead curse, and of the battle between Dracula and a small group of people led by Professor Abraham Van Helsing.",
                "book_publish_date" => "1897-05-26",
                "book_page" => 418,
                "publisher_id" => 5
            ],
            [
                "book_title" => "The Adventures of Sherlock Holmes",
                "book_author" => "Arthur Conan Doyle",
                "book_cover_url" => Storage::url("books/36.jpg"),
                "book_description" => "The Adventures of Sherlock Holmes is a collection of twelve short stories by Arthur Conan Doyle, first published on 14 October 1892. It contains the earliest short stories featuring the consulting detective Sherlock Holmes, which had been published in twelve monthly issues of The Strand Magazine.",
                "book_publish_date" => "1892-10-14",
                "book_page" => 307,
                "publisher_id" => 1
            ],
        ];

        DB::table("books")->insert($data);
    }
}
