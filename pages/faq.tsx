import React, { FC } from 'react'
import type { NextPage } from 'next'
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

import MainLayout from 'layouts/main-layout'
import { BasicProps } from 'lib/react-utils'

import Image from 'next/image'
import profile from 'public/profile.webp'

const IndexHeading: FC<BasicProps> = ({ children }: BasicProps) => {
  return (
    <Heading
      size="md"
      mb={4}
      textDecoration="underline"
      textUnderlineOffset="6px"
      textDecorationThickness="2px"
    >
      {children}
    </Heading>
  )
}

const Home: NextPage = () => {
  const data: Array<[String, Array<[string, string]>]> = [
    [
      'Personal',
      [
        [
          'Where did you grow up / where were you born?',
          'I was born in downtown Manhattan, but movied to New Jersey when I was one year old. I lived in New Jersey until I left for college in Cambridge. ' + 
          'Fun fact: at the time of writing this (20 years old), I\'ve never left the east coast timezone! The only places I\'ve visited are: ' + 
          'New Jersey, New York, Massachusetts, Canada, Washington DC, and Florida. After graduating college (or even before) I want to visit a ton of places (see Misc. section for details).'
        ],
        [
          'What ethnicity are you?',
          'My parents are both Chinese from the Fujian region of China. They moved to Hong Kong when they were ~10 years old and then to America when they were ~17 years old.'
        ],
        [
          'What languages do you speak?',
          'Besides English, I can understand basic Cantonese since my parents speak a combination of Cantonese and English at home. I speak entirely English at home so my ' + 
          'spoken Cantonese is pretty bad. My parents never spoke Mandarin at home until I started learning in sophomore year of college, so I basically started learning from ' + 
          'scratch. As of now, my Mandarin is also bad, but I\'m hoping to get it to a conversational level by the end of college. I don\'t understand a single word of Fuzhounese ' + 
          'despite it being my parents first language T_T'
        ]
      ]
    ],
    [
      'Academic',
      [
        [
          'How do I do well on [insert competition here]?',
          'Study and do a lot of practice questions, and I mean *a lot*. There\'s a ton of free material online especially for common olympiads like math / cs ' + 
          'and if you hold yourself accountable to understand ' + 
          'everything you read and practice every skill you study, then you\'ll go really far. ' + 
          'Besides that, keep notes on every question you get wrong so you can try it again later, take tests without time pressure and try to solve every question, ' + 
          '*don\'t read solutions after 30 seconds of not getting a problem*, and do lots of competitions to build test-taking skills / learn to perform under time pressure.'
        ],
        [
          'Any recommendations on classes / camps / tutoring?',
          'I can\'t speak much about camps because I never went to one. For classes, I\'ve taken a lot of classes and almost all of them were just pulling material from a ' + 
          'textbook and then just giving old olympiad questions. I would say that the only thing a class at this kind of level does is organize material into units so you ' + 
          'can focus on specific skills at a certain time and hold you accountable to actually do the work of studying and doing practice problems. Of course, you can derive ' + 
          'more value by asking the instructor one on one questions, but I feel like a lot of things a class does for you are things you can do yourself if you are disciplined ' + 
          'enough. There are tons of free resources that tell you topics to focus on and practice problems for those, and you can just buy textbooks, which are much cheaper ' + 
          'than the class. I do think that tutoring can be incredibly valuable though if they\'re a good tutor (i.e. give you specific advice related to your weaknesses and ' + 
          'properly give you hints / explain problems tailored to your knowledge and learning style)'
        ],
      ]
    ],
    [
      'Programming',
      [
        [
          'How do I get started with programming / what language should I learn?',
          'The number one thing is that you need a project that you want to do. From there, just learn the language and skills you need to execute the project. As an ' + 
          'example, I got into programming because I loved playing modded Minecraft and I wanted to make my own. I googled how to make a Minecraft mod, and then I learned ' + 
          'I needed to know Java. I spent months alternating between watching Java tutorials and Minecraft modding tutorials while typing the code into my computer as well and ' + 
          'experimenting with it. The biggest thing you can do to learn is to a) learn how to effectively copy code (a process I call yoinking) and b) experimenting with that code. ' + 
          'I wanted a ton of features for my Minecraft mod, and through a ton of experimenting and a ton of yoinking, I managed to cobble something together. From there, I moved onto ' + 
          'making Java Swing apps because I had a project idea for a Rubik\'s cube timer, and from there, I just kept learning by making more projects.'
        ],
        [
          'How did you make the website?',
          'The website is written primarily with Next.js, Chakra UI, and Framer motion using Typescript. The blog posts are written in Markdown and are rendered using a renderer I wrote ' + 
          'that works on top of react-markdown, remark, and rehype. See the source code on my GitHub for more details.'
        ],
        [
          'What\'s your computer setup?',
          'I primarily use a custom-built PC with Windows 11, a Intel i5-12400F, NVIDIA GeForce RTX 3060, 16 GB RAM, and a 1 TB SSD. ' + 
          'With my PC, I use a custom built mechanical keyboard with Cherry MX Brown, a Logitech G305 mouse for gaming, and an Apple Magic Trackpad for work. ' +
          'I also have a Dell XPS 15 laptop that I bring around with me and pretty much only use when I\'m working away from home.'
        ],
        [
          'What\'s your programming setup?',
          'I use mostly VS Code with Vim keybindings for general programming. I use NeoVIM for writing my homework in LaTeX. I only use other software such as Visual Studio for projects that don\'t have terminal build instructions (i.e. large C++ projects). ' + 
          'I don\'t really find editors like PyCharm or IntelliJ IDEA to be useful and only use them if there are no build instructions that don\'t use them.'
        ],
      ]
    ],
    [
      'Misc.',
      [
        [
          'Favorite video games?',
          'Every Batman Arkham game, Legend of Zelda Breath of the Wild, Super Mario Oddysey, Super Smash Brothers Melee. I\'m playing through Tears of the Kingdom right now but it\'s looking like it\'ll definitely make it. Some other favorites include Marve Spider-Man, Stardew Valley, Terraria, and Shovel Knight. I feel like I\'m definitely forgetting some games, but I\'ll add them later if I think of them.'
        ],
        [
          'What about League of Legends?',
          'I have a love-hate relationship with this game LMAO, I play it almost every day, but it\'s only really fun when I\'m just hanging out with friends while playing and I don\'t care about winning. I do watch a ton of competitive League though and am very invested in it.'
        ],
        [
          'Favorite food?',
          'Fresh egg tarts from a Chinese bakery are incredibly good when they\'re really flaky and the egg is soft and fresh. But my favorite has to be shrimp rice noodles at Dim Sum. Every time I go to Dim Sum with my family, I end up eating five plates of just these.'
        ],
        [
          'Favorite movies?',
          'I don\'t watch movies too much, but in order: Everything Everywhere All at Once, Your Name, Spirited Away.'
        ],
        [
          'Favorite anime?',
          'I\'ve only watched the mainstream anime so my list is not very diverse T_T. I want to watch more but haven\'t found the motivation to get into them. ' + 
          'In order: Fullmetal Alchemist: Brotherhood, Spy x Family, Attack on Titan, Death Note. The only other things I\'ve watched are Dragonball / Yugioh.'
        ],
        [
          'Favorite books?',
          'I\'ll admit that that I have not read that many books since middle school, so I haven\'t read that much past young adult fiction oops. ' +
          'But the book series that I always come back to and that I\'ve reread at least eight times is Ranger\'s Apprentice and its spinoff series: Brotherband Chronicles.'
        ],
        [
          'Favorite music?',
          'I listen to mostly just kpop by default, and my favorite artists are: ITZY, TWICE, Day6, LOONA, aespa, IU. ' +
          'Besides kpop, I listen to random English pop songs or movie / anime soundtracks. ' + 
          'In particular, I have a lot of Radwimps saved in my study playlist from Your Name and Weathering with You (both amazing movies).'
        ],
        [
          'Favorite Pokemon?',
          'Piplup and Eevee are easily my top two in order, besides that we have Cyndaquil, Mudkip, Lucario, Snorlax, Dragonite. ' + 
          'In my sophomore year of college, my roommate and I ordered a 2 meter, 50 lb Snorlax plush for our room which is the reason why Snorlax made it to this list LMAO.'
        ],
        [
          'Where do you want to live?',
          'My ideal two locations are either New York City / neighboring suburb or in California. ' + 
          'I\'ve been to NYC countless times though to visit family and I\'ve never even been to California before, so I would love to try living there one day.'
        ],
        [
          'Where do you want to travel?',
          'My bucket list in no particular order: Greenland / Iceland, China, Hong Kong, Japan, South Korea, California. ' +
          'I\'ve heard great things about all of these places such as the views or the food, and I would love to in general just get of the American east coast bubble and explore other cultures!'
        ],
      ]
    ],
  ]

  return (
    <MainLayout>
      <Container pt={8}>
        <Box pt={6}>
          <Heading
            size="lg"
            textAlign="center"
            textDecoration="underline"
            textDecorationThickness="3px"
            textUnderlineOffset="8px"
          >
            FAQ
          </Heading>
        </Box>

        {
          data.map(section => <Box mb={8}>
            <IndexHeading>{section[0]}</IndexHeading>
            <UnorderedList ml={5} mt={1}>
            {section[1].map(qa => <ListItem>
              <Heading
                size="sm"
              >
                {qa[0]}
              </Heading>
              <Text mt={1} mb={3}>
                {qa[1]}
              </Text>
            </ListItem>)}
            </UnorderedList>
          </Box>)
        }
      </Container>
    </MainLayout>
  )
}

export default Home
