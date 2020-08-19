import React, { Fragment, useState, useEffect } from "react"
import PropTypes from 'prop-types'

import { Heading3, Paragraph, Link } from "../../_lib-components/Typography"
import { InitialsBadge } from "../../_lib-components/InitialsBadge"
import { Modal, ModalBody, ModalSideActions } from "../../_lib-components/Modal"
import { Select, SelectMultiple } from "../../_lib-components/Select"
import { TextField } from "../../_lib-components/TextField"
import { Icon } from '../../_lib-components/Icon'

import "./styles.scss"

export function YffConfirmationModal({ selectedStudent, ...props}) {
  const [search, setSearch] = useState('Metro Branding')
  const [select, setSelect] = useState(null)
  const [selectMultiple, setSelectMultiple] = useState([
    { value: 2, label: 'Valg 2' },
    { value: 3, label: 'Valg 3' },
  ])
  const [text, setText] = useState('')

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);

    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleKeyPress(event) {
    if (event.key === 'Escape') {
        props.onDismiss()
    }
  }

  return (
    <Fragment>
      <Modal 
        { ...props }
        className="yff-confirmation-modal"
        onDismiss={ props.onDismiss }
      >
        <ModalBody>

          <div className="person-information">
            <div className="image">
              <InitialsBadge firstName={selectedStudent.firstName} lastName={selectedStudent.lastName} size="large" />
            </div>
            <div className="text-wrapper">
              <Heading3 className="name">
                {selectedStudent.firstName} {selectedStudent.lastName}
              </Heading3>
              <div className="other">
                <Paragraph>Noe mer tekst her</Paragraph>
                <Paragraph>Og enda noe mer tekst her</Paragraph>
                <Paragraph>Og en e-postadresse</Paragraph>
              </div>
            </div>
          </div>

          <p className="intro">
            Her oppretter du bekreftelse om utplassering av eleven. Du må ha navnet eller organisasjonsnummeret til virksomheten hvor eleven skal utplasseres, avdelingen hvor eleven skal arbeide, og oppmøtested. Du må også fylle ut kontaktinformasjon til kontaktperson(er) hos virksomheten, i tillegg til elevens pårørende.
            <br/>
            <br/>
            Ved søk på virksomhet kan du bruke virksomhetens navn eller organisasjonsnummer.
          </p>

          <div className="form">

            <h2 className="subheader">Mellomheader</h2>

            <div className="input-element">
              <TextField
                hasSearchIcon
                placeholder="Søk etter virksomheten hvor eleven skal på utplassering"
                value={ search }
                onChange={ (event) => { setSearch(event.target.value) } }
              />
            </div>

            <div className="prefilled">
              <div className="prefilled-label">Ferdig utfylt</div>
              <div className="prefilled-text">Hentet info her</div>
            </div>

            <div className="prefilled">
              <div className="prefilled-label">Ferdig utfylt</div>
              <div className="prefilled-text">Hentet info her</div>
            </div>

            <h2 className="subheader">Mellomheader</h2>

            <div className="input-element">
              <TextField
                placeholder="Placeholder tekstinput"
                value={ text }
                onChange={ (event) => { setText(event.target.value) } }
              />
            </div>

            <div className="input-element">
              <Select
                placeholder="Placeholder select enkeltelement"
                items={[
                  { value: 1, label: 'Valg 1' },
                  { value: 2, label: 'Valg 2' },
                  { value: 3, label: 'Valg 3' },
                ]}
                selectedItem={ select }
                onChange={ (item) => { setSelect(item) } }
              />
            </div>

            <div className="input-element">
              <SelectMultiple
                placeholder="Placeholder select flere"
                items={[
                  { value: 1, label: 'Valg 1' },
                  { value: 2, label: 'Valg 2' },
                  { value: 3, label: 'Valg 3' },
                  { value: 4, label: 'Valg 4' },
                  { value: 5, label: 'Valg 5' },
                ]}
                selectedItems={ selectMultiple }
                onChange={ (item) => { 
                  setSelectMultiple([
                    { value: 1, label: 'Valg 1' },
                    { value: 2, label: 'Valg 2' },
                    { value: 3, label: 'Valg 3' },
                    { value: 4, label: 'Valg 4' },
                    { value: 5, label: 'Valg 5' },
                  ])
                } }
              />
            </div>

            <h2 className="subheader">Kontaktperson</h2>

            <div className="contact-person">
              <div className="input-element">
                <TextField
                  placeholder="Fornavn og etternavn"
                  value={ '' }
                  onChange={ (event) => { console.log(event.target.value) } }
                />
              </div>

              <div className="input-element">
                <TextField
                  placeholder="Telefonnummer"
                  value={ '' }
                  onChange={ (event) => { console.log(event.target.value) } }
                />
              </div>

              <div className="input-element">
                <TextField
                  type="email"
                  placeholder="E-post"
                  value={ '' }
                  onChange={ (event) => { console.log(event.target.value) } }
                />
              </div>

              <div className="input-element">
                <TextField
                  placeholder="Avdeling"
                  value={ '' }
                  onChange={ (event) => { console.log(event.target.value) } }
                />
              </div>
            </div>

            { /* TODO: component */ }
            <button className="add-more-button button-left-icon button-primary">
              <div className="button-left-icon-icon">
                <Icon name="add" size="small" />
              </div>
              <div className="button-left-icon-text">
                Legg til kontaktperson
              </div>
            </button>

            <h2 className="subheader">Pårørende</h2>

            <div className="dependent-person">
              <div className="input-element">
                <TextField
                  placeholder="Fornavn og etternavn"
                  value={ '' }
                  onChange={ (event) => { console.log(event.target.value) } }
                />
              </div>

              <div className="input-element">
                <TextField
                  placeholder="Telefonnummer"
                  value={ '' }
                  onChange={ (event) => { console.log(event.target.value) } }
                />
              </div>
            </div>

            { /* TODO: component */ }
            <button className="add-more-button button-left-icon button-primary">
              <div className="button-left-icon-icon">
                <Icon name="add" size="small" />
              </div>
              <div className="button-left-icon-text">
                Legg til pårørende
              </div>
            </button>

          </div>

        </ModalBody>
        <ModalSideActions>
        
          <div className="action">
            <Link onClick={ () => { alert('Ikke implementert') } }>Forhåndsvisning</Link>
          </div>
          <div className="action">
            { /* TODO: component */ }
            <button className="button button-primary">Send</button>
          </div>
          <div className="action">
            <Link onClick={ props.onDismiss }>Avslutt</Link>
          </div>
          
        </ModalSideActions>
      </Modal>
    </Fragment>
  )
}

YffConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
  className: PropTypes.string,
}