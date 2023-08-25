'use client'

import { Box, useColorModeValue, Heading, Text } from '@chakra-ui/react'

import Container from 'components/ui/Container'

export default function Terms() {
  const backgroundColor = useColorModeValue('neutral.200', 'gray.800')

  return (
    <Box background={backgroundColor}>
      <Container>
        <Box py={10}>
          <Heading as="h1" pt={10}>
            ReVision General Terms of Use
          </Heading>
          <Text py={4}>Effective Date: March 1, 2023</Text>
          <Text py={4}>
            {`
          Welcome to ReVision! We're ("we", "us", or "ReVision") thrilled to have you on our website and looking into using our service (the "Services"). Please continue reading to learn about the terms by which you may use our web and/or mobile services (collectively, the "Services"). By accessing or using the Services and/or checking the box marked ["I Agree"], you let us know that you have read, understood, and agree to be bound by this Agreement and to the collection and use of your information as set forth in our Privacy Policy, otherwise you may not use the Services. Because our Services change, the terms in this Agreement and our Privacy Policy may change too. We will notify users via email in advance of any material changes to the terms. Upon making changes, we will update the "Effective Date" found at the top of this page. Your continued use of the Services after any changes constitutes your acceptance of the new terms.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            ReVision’s Services
          </Heading>
          <Heading as="h3" pt={5} size="md">
            What does ReVision do?
          </Heading>
          <Text py={4}>
            {`
          ReVisionary Software flags bias in documents and communications, and provides examples of the phrase that would be more objective. These examples can sometimes be used to directly replace what was written. These examples may not always provide an exact rewriting of the phrase. You know best! You decide whether to use the examples provided, or to craft your own rewriting of the subjective phrase.
        `}
          </Text>

          <Heading as="h3" pt={5} size="md">
            Mistakes happen!
          </Heading>
          <Text py={4}>
            {`
          ReVision is driven by AI, and machine learning is…learning! It’s a work in progress. If you catch something you think is a mistake, please let us know! ReVision is not liable for mistakes, but we would love to know about them so that we can make improvements. When you accept the Terms of Service, you are acknowledging that ReVision is not liable for errors in bias flags or suggestions.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Details of the services
          </Heading>
          <Text py={4}>
            {`
          Your ReVision account gives you access to our Services, but don't sign up on behalf of a school, organization, or company if you do not have the authority to do so. Once you sign up, you are responsible for your account and any data associated with it.
        `}
          </Text>
          <Text py={4}>
            {`
          Your ReVision account gives you access to the Services and functionality we make available. We maintain different types of accounts for different types of Users. If you open a ReVision account on behalf of a school, organization, or company, then: (a) "you" includes you and that entity, and (b) you represent and warrant that you are an authorized representative of the entity with the authority to bind the entity to this Agreement and that you agree to this Agreement on the entity's behalf. You are responsible for any activity that occurs on your account, you may never use someone else's account without permission, and you must keep your account password secure. Please let us know immediately if you think your account's security has been compromised so we can help; we are not liable for any losses of any kind caused by any unauthorized use of your account.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Electronic Communication
          </Heading>
          <Text py={4}>
            {`
          We love talking to our users! That’s why we send you emails and texts sometimes. You may control your profile and how you interact with the Services by changing your settings. By providing your email address to us you consent to us sending you Services-related notices, including any required legal notices and other messages. While we need your email address to send you important Services-related notices, you can always ask us to stop sending you marketing messages.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Content Ownership
          </Heading>
          <Text py={4}>
            {`
          You own all content that you use with ReVision; we have the right to use your content to make our product better, but we won’t store it, copy it, or share it with anyone. We own ReVision’s proprietary content and development, and we ask that you refrain from doing any harm to or with our product and services. Specific terms related to our do no harm policy are found here, and your use of the product indicates that you agree to adhere to this policy.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Termination/Access Restriction
          </Heading>
          <Text py={4}>
            {`
          We don't want to do it, but we have the right to terminate your account or restrict your access to our product if you violate the terms outlined here, cause any harm to our company, use or product and/or Service to cause harm, or for any other reason.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Third Party Providers
          </Heading>
          <Text py={4}>
            {`
          Our Services may contain links to other sites or services (collectively, "Third-party Materials"), but we can’t guarantee their content or security. Keep in mind that we do not endorse or assume any responsibility for any Third-party Materials. We are not responsible for any loss or damage related to your dealings with Third-party Providers.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Liability and Disputes
          </Heading>
          <Heading as="h3" pt={5} size="md">
            Indemnity
          </Heading>
          <Text py={4}>
            {`
          If you do anything that gets ReVision into legal trouble, you agree to indemnify and hold us harmless. More information on indemnification is here.
        `}
          </Text>

          <Heading as="h3" pt={5} size="md">
            Warranty
          </Heading>
          <Text py={4}>
            {`
          The Services are provided on an "as is" and "as available" basis. Use of the Services is at your own risk. To the maximum extent permitted by applicable law, the Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement. Federal law, some states, provinces and other jurisdictions do not allow exclusions and limitations of certain implied warranties, so some of the above limitations may not apply to you.
        `}
          </Text>

          <Heading as="h3" pt={5} size="md">
            Limitation of Liability
          </Heading>
          <Text py={4}>
            {`
          We'll do our best to provide a safe and satisfying experience, but we can't guarantee that everything will be perfect. We're not responsible for any damages or losses that may occur while using our product. More information on liability can be found here.
        `}
          </Text>

          <Heading as="h3" pt={5} size="md">
            Arbitration
          </Heading>
          <Text py={4}>
            {`
          If we have a dispute, let's try to work it out. If that doesn't work, we'll have to go to arbitration. More information on the arbitration clauses can be found here.
        `}
          </Text>
          <Text py={4}>
            {`
        For any Claim, you agree to first contact us at legal@revisioned.org and attempt to resolve the dispute with us informally. In the unlikely event that we have not been able to resolve a Claim after sixty (60) days, we each agree to resolve any Claim exclusively through binding arbitration by AAA before a single arbitrator (the "Arbitrator"), under the Expedited Procedures then in effect for AAA (the "Rules"), except as provided herein.
        `}
          </Text>
          <Text py={4}>
            {`
          Don’t like arbitration? If you’re a new User, you can opt-out of this Arbitration Agreement within 30 days of accepting this Agreement by emailing us at legal@revisioned.org with your first and last name and stating your intent to opt-out of the Arbitration Agreement.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Copyright Infringement
          </Heading>
          <Text py={4}>
            {`
          We respect the intellectual property of creators, and would never intentionally use someone else’s content. We fully comply with the Digital Millennium Copyright Act of 1998 ("DMCA") If you see copyrighted material on our website or associated with our product or Services, please let us know and we’ll take it down.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Privacy and Data
          </Heading>
          <Heading as="h3" pt={5} size="md">
            General Privacy and Data Terms
          </Heading>
          <Text py={4}>
            {`
          ReVision will never store personally identifiable information about any user. Anonymized, de-identified data may be used to improve the products and services we provide, and may be aggregated and provided to school, organization, or company administrators in the form of dashboards that track trends.
        `}
          </Text>
          <Text py={4}>
            {`
          De-identified data means data from which all personally identifiable information, including direct and indirect identifiers, has been permanently removed or obscured so that the remaining information does not reasonably identify an individual and there is no reasonable basis to believe that the information can be used to identify an individual.
        `}
          </Text>
          <Text py={4}>
            {`
          Any data we share or publicly disclosed will be aggregated or anonymized to reasonably avoid identification of a specific school, organization, company, or individual. You further agree that we may use, store, transmit, distribute, modify, copy, display, sublicense, and create derivative works of de-identified data even after this Agreement has expired or been terminated.
        `}
          </Text>

          <Heading as="h3" pt={5} size="md">
            Information collected through technology
          </Heading>
          <Text py={4}>
            {`
          Like most websites and online services, we automatically collect certain types of usage information when you use our Services, read our emails, or otherwise engage with us. We typically collect this information through a variety of tracking technologies, including cookies, web beacons, file information and similar technology (collectively, "tracking technologies").
        `}
          </Text>
          <Text py={4}>
            {`
          Cookies and related technology allow us to provide you with a better user experience. If you would prefer not to accept cookies, most browsers will allow you to: (i) change your browser settings to notify you when you receive a cookie, which lets you choose whether or not to accept it; (ii) disable existing cookies; or (iii) set your browser to automatically reject cookies.
        `}
          </Text>
          <Text py={4}>
            {`
          More information about cookies and tracking can be found here.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            School and Student Information
          </Heading>
          <Heading as="h3" pt={5} size="md">
            Keeping School and Student Data Confidential
          </Heading>
          <Text py={4}>
            {`
          We treat your Student Data as confidential and do not knowingly share it with third parties. Our intention is to keep schools and students safe, and we would never knowingly put users at risk or share personally identifiable information. Both parties agree to uphold their responsibilities under the Family Educational Rights and Privacy Act ("FERPA"), the Protection of Pupil Rights Amendment ("PPRA"), and the Children's Online Privacy and Protection Act ("COPPA"). We provide the Services under the school official exception of FERPA 34 CFR Part 99.31(a)(1).
        `}
          </Text>
          <Text py={4}>
            {`
          The Children's Online Privacy and Protection Act ("COPPA") requires that online service providers obtain clear and verifiable parental consent before collecting personal information from children under 13. You represent and warrant that you have the authority to provide consent on behalf of parents, for us to collect information from students for the purpose of providing the Services to you as described in these Terms before allowing children under 13 to access our Services. We recommend that all Schools provide appropriate disclosures to students and parents regarding their use of service providers such as Clever and that they provide a copy of our Privacy Policy to parents and guardians.
        `}
          </Text>
          <Text py={4}>
            {`
          We only use student and school data for the purposes of the Services we provide. We only store and share aggregate, anonymized, de-identified data.
        `}
          </Text>

          <Heading as="h2" pt={10} size="lg">
            Children’s Privacy
          </Heading>
          <Text py={4}>{`ReVision does not collect student information without consent.`}</Text>
          <Text py={4}>
            {`ReVision does not knowingly collect any information from children under the age of 13 (or the applicable age of consent in local
        jurisdictions) unless and until the School has obtained appropriate parental consent. Because ReVision uses Student Data at the
        direction of and under the control of a School, ReVision relies on each School to provide appropriate notice to parents, and for the
        Schools to provide consent, if necessary, and authorization for ReVision to use Student Data to inform the product and Services, as
        permitted by the Children's Online Privacy Protection Act (COPPA) and other applicable data protection laws. ReVision will use
        student data to inform the software but will not store it for future use.`}
          </Text>
          <Text py={4}>
            {`Please contact us at legal@revisioned.org if you believe we have inadvertently collected personal information of a child without
        proper consent so that we may delete such data as soon as possible.`}
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
