import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FlashcardArray } from "react-quizlet-flashcard";

// import "./flashcardCarousel.scss"; // Import CSS for styling

const FlashcardCarousel = ({ flashcards }) => {


      const cards = [
        {
          id: 1,
          frontHTML: <div>What is the capital of <u>Alaska</u>?</div>,
          backHTML: <>Juneau</>,
        },
        {
          id: 2,
          frontHTML: <>What is the capital of California?</>,
          backHTML: <>Sacramento</>,
        },
        {
          id: 3,
          frontHTML: <>What is the capital of New York?</>,
          backHTML: <>Albany</>,
        },
        {
          id: 4,
          frontHTML: <>What is the capital of Florida?</>,
          backHTML: <>Tallahassee</>,
        },
        {
          id: 5,
          frontHTML: <>What is the capital of Texas?</>,
          backHTML: <>Austin</>,
        },
        {
          id: 6,
          frontHTML: <>What is the capital of New Mexico?</>,
          backHTML: <>Santa Fe</>,
        },
        {
          id: 7,
          frontHTML: <>What is the capital of Arizona?</>,
          backHTML: <>Phoenix</>,
        },
      ];
      return (
        <div>
          <FlashcardArray cards={cards} />
        </div>
      );
    }

export default FlashcardCarousel;
