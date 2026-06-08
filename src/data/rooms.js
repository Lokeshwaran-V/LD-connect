import CoupleImage from "../assets/Cupid.webp"
import FamilyImage from "../assets/Family.webp"
import GangImage from "../assets/Gang.webp"
import PartyImage from "../assets/Party.webp"

export const rooms = [
    {
      id: "couple",
      title: "Couple",
      icon: "💕",
      maxUsers: 2,
      description: "Private room for two",
      image: CoupleImage,
    },
    {
      id: "family",
      title: "Family",
      icon: "👨‍👩‍👧‍👦",
      maxUsers: 5,
      description: "Stay connected with family",
      image: FamilyImage,
    },
    {
      id: "gang",
      title: "Gang",
      icon: "😎",
      maxUsers: 15,
      description: "Friends and buddies hangout",
      image: GangImage,
    },
    {
      id: "party",
      title: "Party",
      icon: "🎉",
      maxUsers: 30,
      description: "Large group watch party",
      image: PartyImage,
    },
  ];