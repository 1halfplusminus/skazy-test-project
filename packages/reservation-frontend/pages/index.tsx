import styled from '@emotion/styled';
import { ConnectedReservationForm } from '../containers/connected-reservation/connected-reservation-form';
import { css } from '@emotion/react';
import tw from 'twin.macro';
import { House, Icon } from '@skazy/reservation-ui';
import { Canvas } from '@react-three/fiber';
const StyledPage = styled.div``;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.@emotion/styled file.
   */
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1
              css={css`
                ${tw`text-gray-300 text-xl flex gap-2 items-center`}
              `}
            >
              <div
                css={css`
                  ${tw`h-16 w-16`}
                `}
              >
                <Icon />
              </div>
              CYBER PUNK New Caledonia Gîte{' '}
              <div
                css={css`
                  ${tw`h-16 w-16`}
                `}
              >
                <Icon />
              </div>
            </h1>
          </div>

          <div
            id="hero"
            className="rounded"
            css={css`
              ${tw`bg-gray-700`}
            `}
          >
            <div className="text-container">
              <h2>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span>Remplissez le formulaire ci-dessous pour réserver !</span>
              </h2>
              <h3
                css={css`
                  ${tw`text-base`}
                `}
              >
                <span
                  css={css`
                    ${tw`leading-normal text-red-400`}
                  `}
                >
                  5000 XPF
                </span>{' '}
                la nuit pour une chambre en semaine,et{' '}
                <span
                  css={css`
                    ${tw`leading-normal text-red-400`}
                  `}
                >
                  7000 XPF
                </span>{' '}
                le week-end.
              </h3>
              <span
                css={css`
                  ${tw`leading-relaxed text-gray-400 font-light`}
                `}
              >
                &quot;Une expérience exceptionnelle.&quot;
              </span>
            </div>
            <div
              className="logo-container"
              css={css`
                ${tw`h-80`}
              `}
            >
              <Canvas>
                <House />
              </Canvas>
            </div>
          </div>
          <div className="container mt-2" id="#form">
            <ConnectedReservationForm />
          </div>
        </div>
      </div>
    </StyledPage>
  );
}

export default Index;
