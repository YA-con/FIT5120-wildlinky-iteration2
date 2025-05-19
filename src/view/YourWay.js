import React, { useEffect, useState } from "react";
import styles from "./YourWay.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import nationalTreeDay from '../assets/national-tree-day.jpg';
import centralHighlands from '../assets/Central-Highlands.png';
import nativeForest from '../assets/Native-Forest.png';
import gellibrand from '../assets/Goolengook-Forest.png';
import littleDesert from '../assets/Little-Desert.png';
import boxIronbark from '../assets/Box-Ironbark.png';
import { useNavigate } from 'react-router-dom';
import HeaderOverlay from '../components/HeaderOverlay';

const ITEMS_PER_PAGE = 3;

const MOCK_DATA = [
  {
    id: 1,
    name: "WOLLERT COMMUNITY FARM CONSERVATION VOLUNTEER",
    description: "Support native seed collection, planting, and habitat restoration at Wollert Community Farm. Help revegetate Curly Sedge Creek, home to a rare plant species. Join our nugal biik mission - “belongs to the earth” - and care for Country.",
    type: "Garden Maintenance",
    organization: "Whittlesea Community Connections",
    regions: ["Wollert VIC"],
    suitable: "People Learning English, Work Experience",
    Training: null,
    Requirements: "National Police Certificate\nB2Working with Children Check",
    Commitment: "Regular - more than 6 months",
    Time_required: "Wednesday 10am – 1pm",
    url: "https://www.volunteer.com.au/volunteering/168475/wollert-community-farm-conservation-volunteer"
  },
  {
    id: 2,
    name: "Maintenance Conservation Environment",
    description: "Join weekly sessions to help restore native vegetation along the Bellarine Rail Trail. Tasks include planting, watering, weeding, and propagating seedlings.",
    type: "Garden Maintenance",
    organization: "Friends of Bellarine Rail Trail Inc",
    regions: ["Drysdale VIC", "Geelong VIC"],
    suitable: null,
    Training: null,
    Requirements: null,
    Commitment: "Regular - more than 6 months",
    Time_required: "Flexible hours available.",
    url: "https://www.volunteer.com.au/volunteering/8908/maintenance-conservation-environment"
  },
  {
    id: 3,
    name: "Treasurer",
    description: "We are looking for a Treasurer to help direct the organisation, particularly in the Accounting and Finance areas.",
    type: "Accounting & Finance",
    organization: "Friends of the Helmeted Honeyeater",
    regions: ["Melbourne VIC", "Woori Yallock VIC", "Yellingbo VIC"],
    suitable: "Skilled Volunteers",
    Training: null,
    Requirements: "Preferably in outer Eastern suburbs of Melbourne as we are based in Yellingbo",
    Commitment: "Regular - more than 6 months",
    Time_required: "A few hours per week",
    url: "https://www.volunteer.com.au/volunteering/214026/treasurer-"
  },
  {
    id: 4,
    name: "Gardens for Wildlife volunteers",
    description: "Wildlife Garden Advisers will be responsible for motivating and inspiring new wildlife gardens by visiting their garden and helping them discover the wildlife and stewardship potential of their gardens. The role will provide opportunities for volunteers to learn, mentor, network and collaborate through a series of workshops and social event.",
    type: "Working with Animals",
    organization: "Volunteer CONNECT",
    regions: ["Warrnambool VIC"],
    suitable: "Training is provided with opportunity to further develop skills & knowledge around habitat gardening & caring for wildlife in backyards.",
    Training: null,
    Requirements: "National Police Certificate\nWorking with Children Check",
    Commitment: "Regular - more than 6 months",
    Time_required: "Garden assessments will require a time commitment of 2 hours plus travel",
    url: "https://www.volunteer.com.au/volunteering/159440/gardens-for-wildlife-volunteers"
  },
  {
    id: 5,
    name: "Environmental helper - Outdoors",
    description: "Depending on current projects, duties to be undertaken would include outdoor work such as planting, nestbox monitoring, fencing, weed control nature trail maintenance, etc.",
    type: "Garden Maintenance, Working with Animals",
    organization: "Parklands Albury Wodonga",
    regions: ["Leneva VIC", "Wodonga VIC"],
    suitable: "Centrelink Volunteers, People Learning English, Skilled Volunteers, Work Experience",
    Training: "On the job training",
    Requirements: null,
    Commitment: "Regular - more than 6 months",
    Time_required: "Mondays and Tuesdays",
    url: "https://www.volunteer.com.au/volunteering/223172/environmental-helper-outdoors"
  },
  {
    id: 6,
    name: "Corporate Volunteering - Groups of 8+",
    description: "Please note this opportunity is specifically open to paying groups, with a minimum order of eight people. If you are interested in individual volunteering opportunities, please check out the Busy Bees programme on the Collingwood Children's Farm website.",
    type: "Garden Maintenance, Working with Animals",
    organization: "Collingwood Children's Farm",
    regions: ["Abbotsford VIC"],
    suitable: "Groups of 10 or more",
    Training: null,
    Requirements: null,
    Commitment: "One off - an event",
    Time_required: "Morning sessions run from 9:30 am to noon. Afternoon sessions run from 1:00 pm to 3:30pm. Approximately 90 minutes of your session involve physical labor.",
    url: "https://www.volunteer.com.au/volunteering/215806/corporate-volunteering-groups-of-8-"
  },
  {
    id: 7,
    name: "Environmental and Conservation Group Volunteer - Koolunga Native Reserve",
    description: "Friends of Koolunga Native Reserve have opportunities for you to volunteer in Ferntree Gully to help protect and enhance the native bushland and wildlife habitat at Koolunga Native Reserve.",
    type: "Environment & Conservation",
    organization: "Friends of Koolunga Native Reserve",
    regions: ["Ferntree Gully VIC"],
    suitable: "Ferntree Gully VIC",
    Training: "Yes",
    Requirements: "Anyone under 18 years of age must be accompanied by a Parent, Guardian or Carer.",
    Commitment: "Regular - less than 6 months",
    Time_required: "No minimum time commitment. Meetings on the second Saturday of every month from 10-12pm.",
    url: "https://www.volunteer.com.au/volunteering/128155/environmental-and-conservation-group-volunteer-koolunga-native-reserve"
  },
  {
    id: 8,
    name: "Support Personnel - Animal Care",
    description: "We are seeking volunteers who have an ability to be versatile, while assisting with all areas of our program. There are many areas and roles we can utilise your much valued support.",
    type: "Trades & Maintenance, Working with Animals",
    organization: "The Winged Horse Equine Welfare Inc",
    regions: ["Portarlington VIC"],
    suitable: null,
    Training: "One the job instruction and guidance provided.",
    Requirements: "Our volunteers must be able working around animal, or maybe you have another qualification you can offer.",
    Commitment: "Regular - more than 6 months",
    Time_required: "As the hours are varied, and negotiable please contact us for additional information.",
    url: "https://www.volunteer.com.au/volunteering/136978/support-personnel-animal-care"
  },
  {
    id: 9,
    name: "Experienced Wildlife Mobile Vet & Darter",
    description: "Help us make a life-saving difference for Australia’s wildlife. Vets for Compassion is seeking a dedicated Volunteer Mobile Wildlife Veterinarian to join our passionate team working across Melbourne and regional Victoria.",
    type: "Working with Animals",
    organization: "Vets for Compassion",
    regions: ["Melbourne VIC"],
    suitable: "Skilled Volunteers",
    Training: "Yes, training provided",
    Requirements: "Driver's Licence (C)\nHeavy Lifting\nMedical Check\nNational Police Certificate\nBVSc Firearms licence preferable.",
    Commitment: "Regular - more than 6 months",
    Time_required: "Equivalent to one day a week minimum",
    url: "https://www.volunteer.com.au/volunteering/225398/experienced-wildlife-mobile-vet-darter"
  },
  {
    id: 10,
    name: "Gardening & Maintenance Assistance",
    description: "We are seeking handy volunteers to assist us with gardening, grounds maintenance and the occasional odd handyman job to keep our site looking neat and tidy.",
    type: "Garden Maintenance, Sport & Physical Activity, Trades & Maintenance",
    organization: "Geelong Animal Welfare Society",
    regions: ["Moolap VIC"],
    suitable: "Centrelink Volunteers, Groups of 10 or more, Skilled Volunteers, Travelling Volunteers",
    Training: "An induction will be provided as well as guidance on the job",
    Requirements: "National Police Certificate\nAll GAWS volunteers must provide photo ID and pass a volunteer police check.",
    Commitment: "Regular - more than 6 months",
    Time_required: "Flexible with days and times but usually morning and afternoon shifts available",
    url: "https://www.volunteer.com.au/volunteering/82213/gardening-maintenance-assistance"
  }
];

const YourWay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [opportunities, setOpportunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setOpportunities(MOCK_DATA.slice(start, end));
  }, [currentPage]);

  const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.bannerOverlay}>
        <HeaderOverlay />
          <h1>Raise your voice. Make forest protection happen.</h1>
          <p>Be part of the solution – support forest campaigns, sign petitions, and inspire change.</p>
        </div>
      </div>

      <section className={`${styles.section} ${styles.volunteerSection}`}>

      <h1 className={styles.title}>
        Join a campaign and make a difference today!
      </h1>
      <p className={styles.subtitle}>Explore real-world volunteering roles:</p>

      {opportunities.map((item) => (
        <div key={item.id} className={styles.card}>
          <h3>📌 <strong>{item.name}</strong></h3>
          <p>🏢 <strong>Organization:</strong> {item.organization}</p>
          <p>🌍 <strong>Regions:</strong> {item.regions.join(", ")}</p>
          <p>🗂️ <strong>Type:</strong> {item.type}</p>
          <p>📄 <strong>Description:</strong> {item.description}</p>
          {item.suitable && <p>✅ <strong>Suitable for:</strong> {item.suitable}</p>}
          {item.Training && <p>🎓 <strong>Training:</strong> {item.Training}</p>}
          {item.Requirements && <p>📋 <strong>Requirements:</strong> {item.Requirements}</p>}
          <p>🕐 <strong>Commitment:</strong> {item.Commitment}</p>
          <p>📆 <strong>Time Required:</strong> {item.Time_required}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            🔗 View Opportunity
          </a>
        </div>
      ))}

      {totalPages > 1 && (
        <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": { color: "#07431E", fontWeight: "bold" },
                "& .Mui-selected": { backgroundColor: "#07431E !important", color: "white" },
              }}
            />
          </Stack>
        </div>
      )}
      </section>

      <section className={`${styles.section} ${styles.chartSection}`}>
        <h2 className={styles.sectionTitle}>Success stories</h2>
        <p className={styles.sectionIntro}>
          These real victories prove that your voice and actions matter — together, we can protect our forests.
        </p>

        <div className={styles.chartGrid}>
          <a
            href="https://treeday.planetark.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={nationalTreeDay} alt="National Tree Day" />
            <div className={styles.overlay}>
              <h3>National Tree Day – Planet Ark</h3>
              <p>Over 27 million trees planted across Australia with strong community support.</p>
            </div>
          </a>

          <a
            href="https://forcechange.com/552223/success-logging-in-australias-fire-ravished-forests-banned/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={centralHighlands} alt="Logging Stopped in Central Highlands" />
            <div className={styles.overlay}>
              <h3>Logging Stopped in Central Highlands</h3>
              <p>Grassroots action and legal petitions led by WOTCH helped halt destructive logging, saving key habitat.</p>
            </div>
          </a>

          <a
            href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0319531"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={nativeForest} alt="Native Forest Logging Ended Early" />
            <div className={styles.overlay}>
              <h3>Native Forest Logging Ended Early</h3>
              <p>Thanks to pressure from scientists and citizens, Victoria ended native forest logging 6 years ahead of schedule in 2024.</p>
            </div>
          </a>
        </div>

        <div className={styles.chartGrid}>
          <a
            href="https://ejatlas.org/conflict/saving-goolengook-forest-block"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={gellibrand} alt="Goolengook Forest Saved" />
            <div className={styles.overlay}>
              <h3>Goolengook Forest Saved</h3>
              <p>Community-led protest camps and public support led to long-term protection of Goolengook forest in East Gippsland.</p>
            </div>
          </a>

          <a
            href="https://vnpa.org.au/70-years-of-success/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={littleDesert} alt="Little Desert National Park Created" />
            <div className={styles.overlay}>
              <h3>Little Desert National Park Created</h3>
              <p>Public outcry in the 1960s led to the creation of one of Victoria’s first national parks.</p>
            </div>
          </a>

          <a
            href="https://vnpa.org.au/going-the-full-ten-rounds-for-box-ironbark-forests/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.chartCard}
          >
            <img src={boxIronbark} alt="Box-Ironbark Forests Preserved" />
            <div className={styles.overlay}>
              <h3>Box-Ironbark Forests Preserved</h3>
              <p>Letters and petitions helped secure long-term protection of Victoria’s unique Box-Ironbark woodlands.</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default YourWay;
