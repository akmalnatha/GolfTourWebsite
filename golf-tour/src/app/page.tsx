'use client';

import RankingCard from '@/components/ranking-card'
import Table from '@/components/table'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  type dataTable = {
    nama: string;
    angkatan: string;
    skor: number[];
    rank?: number
  }[];

  const data : dataTable =[
    {
      nama: "Armin",
      angkatan: "2009",
      skor: [
        1, 3, 5, 7, 4, 8, 4, 2, 6 
      ],
    },
    {
      nama: "Agus",
      angkatan: "2003",
      skor: [
        2, 3, 6, 3, 7, 3, 4, 2, 6 
      ],
    },
    {
      nama: "Andi",
      angkatan: "2007",
      skor: [
        4, 2, 5, 0, 5, 7, 3, 2, 6 
      ],
    },
    {
      nama: "Yudi",
      angkatan: "2007",
      skor: [
        2, 3, 4, 4, 5, 7, 3, 3, 4 
      ],
    },
    {
      nama: "Ardo",
      angkatan: "2007",
      skor: [
        3, 2, 5, 7, 5, 6, 3, 3, 5 
      ],
    },
    {
      nama: "Billy",
      angkatan: "2007",
      skor: [
        4, 4, 6, 4, 3, 5, 3, 4, 6 
      ],
    },
    {
      nama: "Charlie",
      angkatan: "2010",
      skor: [
        1, 5, 5, 7, 4, 5, 3, 4, 4 
      ],
    },
    {
      nama: "Wawan",
      angkatan: "2010",
      skor: [
        5, 6, 0, 0, 4, 3, 6, 5, 0 
      ],
    },
  ]
  const header = [
    {
      value: 5,
      label: "1",
    },
    {
      value: 6,
      label: "2",
    },
    {
      value: 4,
      label: "3",
    },
    {
      value: 3,
      label: "4",
    },
    {
      value: 4,
      label: "5",
    },
    {
      value: 4,
      label: "6",
    },
    {
      value: 5,
      label: "7",
    },
    {
      value: 6,
      label: "8",
    },
    {
      value: 5,
      label: "9",
    },
  ]

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sortedTableData = [...data].sort(
    (a, b) =>
      a.skor.reduce((sum, score) => sum + score, 0) -
      b.skor.reduce((sum, score) => sum + score, 0)
  )
  sortedTableData.map((data, idx: number) => {
    return(
      data.rank = idx+1
    )
  })

  const group = Array.from(new Set(data.map((item) => item.angkatan))).sort();
  const sortedRankingData = group.map((angkatan) => {
    const filteredDataCard = data.filter((item) => item.angkatan === angkatan);
    const totalScore = filteredDataCard.reduce(
      (accumulator, item) =>
        accumulator + item.skor.reduce((sum, score) => sum + score, 0),
      0
    );
    const averageScore =
    filteredDataCard.length > 0 ? totalScore / filteredDataCard.length : 0;

    return { angkatan, averageScore, filteredDataCard };
  });

  sortedRankingData.sort((a, b) => a.averageScore - b.averageScore);
  //lg:grid lg:grid-cols-2 lg:auto-rows-min lg:gap-2
  return (
    <main className="flex flex-col lg:flex-row min-h-screen gap-2">
      <div className="w-full lg:w-2/3 overflow-auto">
        <Table header={header} data={sortedTableData}/>
      </div>
      <div className="w-full lg:w-1/3 px-1">
        <Slider {...settings}>
        {sortedRankingData.map((item, idx: number) => {
          return(
            <div className="mt-1 px-1 " key={idx}>
              <RankingCard data={item.filteredDataCard} angkatan={item.angkatan} average={item.averageScore} rank={idx+1}/>
            </div>
          )
        })}
        </Slider>
      </div>
    </main>
  )
}
