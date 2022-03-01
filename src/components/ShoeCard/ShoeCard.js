import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let flagColor = ""
  let flagLabel = ""
  if (variant === "on-sale") {
    flagColor = COLORS.primary
    flagLabel = "Sale"
  } else if (variant === "new-release") {
    flagColor = COLORS.secondary
    flagLabel = "Just released!"
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          { variant === "on-sale"
            ? <OriginalPrice>{formatPrice(price)}</OriginalPrice>
            : <Price>{formatPrice(price)}</Price>
          }
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { variant === "on-sale"
            ? <SalePrice>{formatPrice(price)}</SalePrice>
            : undefined
          }
        </Row>
        
        <VariantFlag style={{"--flag-color": flagColor}}>{flagLabel}</VariantFlag>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const VariantFlag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;

  border-radius: 2px;

  height: 32px;
  padding: 0 10px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  font-size: ${14 / 18}rem;
  line-height: 32px;
  background-color: var(--flag-color, transparent);
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  font-weight: ${WEIGHTS.medium};
`;

// special formatting for the original price of a product that is on sale
const OriginalPrice = styled(Price)`
  color: ${COLORS.gray[700]};
  text-decoration: line-through;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;
const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
