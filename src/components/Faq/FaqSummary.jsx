import { FaqAccordion } from "../FaqStyledComponents/FaqStyledComponents";

export default function FaqSummary({ dict }) {
  const faq = dict.FAQ_SUMMARY || [];

  return <FaqAccordion faq={faq} />;
}
