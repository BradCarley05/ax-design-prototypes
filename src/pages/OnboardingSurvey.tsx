import { useState } from 'react'
import easterLogo from '@/assets/easter-logo.svg'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Box } from '@/components/ui/box'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function AXCelerateLogo() {
  return (
    <img src={easterLogo} alt="aXcelerate" className="survey-logo" />
  )
}

function SurveyQuestion({ number, text, children }: { number: number; text: string; children: React.ReactNode }) {
  return (
    <div className="survey-question">
      <Label className="survey-question-label">
        <span className="survey-question-number">{number}.</span>
        {text}
      </Label>
      <div className="survey-question-control">
        {children}
      </div>
    </div>
  )
}

export function OnboardingSurvey() {
  const [consultant, setConsultant] = useState('')
  const [satisfaction, setSatisfaction] = useState('')
  const [mostValuable, setMostValuable] = useState('')
  const [improve, setImprove] = useState('')
  const [testField, setTestField] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="survey-page">
        <AXCelerateLogo />
        <div className="survey-card">
          <Alert variant="positive">
            <AlertDescription>
              Thank you for taking the time to complete our survey...we look forward to continuously improving aXcelerate and our onboarding service!
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="survey-page">
      <AXCelerateLogo />

      <div className="survey-card">
        <h2 className="survey-title">4 Week Onboarding Survey (W/C 11th May 2020)</h2>

        <p className="survey-intro">
          Welcome to our aXcelerate Onboarding Survey. Even if you haven't been using aXcelerate for long, please take a minute to provide your honest feedback regarding your Onboarding experience so far...
        </p>

        <Box direction="col" gap="300" className="survey-questions">

          <SurveyQuestion number={1} text="Who is your key Onboarding Consultant?">
            <Select value={consultant} onValueChange={setConsultant}>
              <SelectTrigger>
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultant-1">Consultant A</SelectItem>
                <SelectItem value="consultant-2">Consultant B</SelectItem>
                <SelectItem value="consultant-3">Consultant C</SelectItem>
              </SelectContent>
            </Select>
          </SurveyQuestion>

          <SurveyQuestion number={2} text="How satisfied are you with the effectiveness of your Onboarding Consultant's training sessions?">
            <Select value={satisfaction} onValueChange={setSatisfaction}>
              <SelectTrigger>
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-satisfied">Very Satisfied</SelectItem>
                <SelectItem value="satisfied">Satisfied</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
                <SelectItem value="very-dissatisfied">Very Dissatisfied</SelectItem>
              </SelectContent>
            </Select>
          </SurveyQuestion>

          <SurveyQuestion number={3} text="What has been the most valuable aspects of your Onboarding experience so far? (e.g. Initial Onboarding project planning / Data migration / Online enrolments / Training etc.)">
            <textarea
              className="survey-textarea"
              value={mostValuable}
              onChange={(e) => setMostValuable(e.target.value)}
            />
          </SurveyQuestion>

          <SurveyQuestion number={4} text="Based on your Onboarding experience so far, what could we improve?">
            <textarea
              className="survey-textarea"
              value={improve}
              onChange={(e) => setImprove(e.target.value)}
            />
          </SurveyQuestion>

          <SurveyQuestion number={5} text="test">
            <textarea
              className="survey-textarea"
              value={testField}
              onChange={(e) => setTestField(e.target.value)}
            />
          </SurveyQuestion>

        </Box>

        <p className="survey-footer-text">
          Thank you for taking the time to complete our survey...we look forward to continuously improving aXcelerate and our onboarding service!
        </p>

        <div className="survey-submit-row">
          <Button variant="positive" loading={loading} onClick={handleSubmit}>
            Submit Your Response
          </Button>
        </div>
      </div>
    </div>
  )
}
