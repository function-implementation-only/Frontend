import styled from 'styled-components'

const PrivacyLayout = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const PrivacyBox = styled.div`
    width: 1000px;
    margin: 0 auto;
    margin-top: 24px;
    @media (max-width: 720px) {
        width: 300px;
    }
`

const ThemeItem = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #44484d;
    margin-bottom: 8px;
    @media (max-width: 720px) {
        font-size: 16px;
    }
`

const SubItem = styled.div`
    margin-bottom: 40px;
    color: #838485;
    @media (max-width: 720px) {
        font-size: 14px;
    }
`

function GooglePrivacy() {
    return (
        <PrivacyLayout>
            <PrivacyBox>
                <ThemeItem>제1조 (목적)</ThemeItem>
                <SubItem>
                    ① “개인정보”란 생존하는 개인에 관한 정보로서 당해 정보에
                    포함되어 있는 성명, 주민등록번호 등의 사항에 의하여 당해
                    개인을 식별할 수 있는 정보(당해 정보 만으로는 특정 개인을
                    식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수
                    있는 것을 포함합니다)를 말합니다. ② 회사는 귀하의
                    개인정보보호를 매우 중요시하며, 『개인정보보호법』,
                    『정보통신망 이용촉진 및 정보보호에 관한 법률』 상의
                    개인정보보호규정 및 정보통신부가 제정한
                    『개인정보보호지침』을 준수하고 있습니다. 회사는
                    개인정보처리방침을 통하여 귀하께서 제공하시는 개인정보가
                    어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해
                    어떠한 조치가 취해지고 있는지 알려드립니다. ③ 회사는
                    개인정보처리방침을 홈페이지 첫 화면에 공개함으로써 귀하께서
                    언제나 용이하게 보실 수 있도록 조치하고 있습니다. ④ 회사는
                    개인정보처리방침의 지속적인 개선을 위하여 개인정보처리방침을
                    개정하는데 필요한 절차를 정하고 있습니다. 그리고
                    개인정보처리방침을 개정하는 경우 버전번호 등을 부여하여
                    개정된 사항을 귀하께서 쉽게 알아볼 수 있도록 하고 있습니다.
                </SubItem>
                <ThemeItem>제2조 (수집하는 개인정보의 항목)</ThemeItem>
                <SubItem>
                    ① 회사는 맞춤형 서비스를 제공하기 위하여 회원서비스 및
                    Google, Facebook, Kakao, Twitter, Daum (OAuth Service
                    제공자)의 OAuth 서비스를 제공하고 있습니다. OAuth Service
                    제공자의 OAuth 서비스를 이용하시고자 할 경우 다음의 정보를
                    입력해주셔야 하며 필수항목을 입력하시지 않는다면 서비스
                    이용에 제한을 받을 수 있습니다. 1. 회원 가입 시 수집하는
                    개인정보의 범위 가. 필수항목 : 비밀번호, 질문, 답변 2.
                    Google, Facebook, Kakao, Twitter, Daum (OAuth Service
                    제공자)의 OAuth 서비스 이용 시 사용자의 테이터에 엑섹스,
                    사용 할 수 있습니다. 3. Google, Facebook, Kakao, Twitter,
                    Daum (OAuth Service 제공자)의 OAuth 서비스 이용과정에서
                    자동생성 정보 가. OAuth Service 제공자에게 전달받은 Token
                    정보 나. OAuth Service를 이용하여 제공받은 데이터나
                    개인정보는 저장하지 않습니다. 다. OAuth Service의 이용을
                    원치 않은 경우 언제든지 연결 해제 버튼을 클릭하여 연결을
                    해제할 수 있으며 저장되어 있는 Token 정보를 삭제할 수
                    있습니다.
                </SubItem>
                <ThemeItem>제3조 (개인정보 수집에 대한 동의)</ThemeItem>
                <SubItem>
                    ① 회사는 귀하께서 회사의 개인정보처리방침 또는 이용약관의
                    내용에 대해 「동의한다」버튼 또는 「동의하지 않는다」버튼을
                    클릭할 수 있는 절차를 마련하여, 「동의한다」버튼을 클릭하면
                    개인정보 수집에 대해 동의한 것으로 봅니다. 단, 회사는 다음
                    각 호의 어느 하나에 해당하는 경우에는 법령에 따라 이와 같은
                    동의 없이 이용자의 개인정보를 수집∙이용할 수 있습니다. 1.
                    정보통신서비스의 제공에 관한 계약을 이행하기 위하여 필요한
                    개인정보로서 경제적 · 기술적인 사유로 통상적인 동의를 받는
                    것이 뚜렷하게 곤란한 경우 2. 정보통신서비스의 제공에 따른
                    요금정산을 위하여 필요한 경우 3. 그 밖에 법률에 특별한
                    규정이 있는 경우
                </SubItem>
                <ThemeItem>제4조 (개인정보의 수집 및 이용목적)</ThemeItem>
                <SubItem>
                    ① 회사는 다음과 같은 목적을 위하여 개인정보를 수집하고
                    있으며 목적이 변경될 경우에는 사전에 이용자의 동의를
                    구하도록 하겠습니다. 1. 비밀번호 : 회원제 서비스 이용에 따른
                    본인 식별 절차에 이용 2. 그 외 선택항목 : 개인맞춤 서비스를
                    제공하기 위한 자료
                </SubItem>
                <ThemeItem>제5조 (쿠키에 의한 개인정보 수집)</ThemeItem>
                <SubItem>
                    ① 쿠키(cookie)는 웹사이트가 귀하의 컴퓨터
                    브라우저(넷스케이프, 인터넷 익스플로러 등)로 전송하는 소량의
                    정보입니다. 회사는 귀하에 대한 정보를 저장하고 수시로
                    찾아내는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 귀하의 컴퓨터는
                    식별하지만 귀하를 개인적으로 식별하지는 않습니다. 또한
                    귀하는 쿠키에 대한 선택권이 있습니다. ② 웹브라우저 상단의
                    도구{' >'} 인터넷옵션 탭(option tab)에서 모든 쿠키를 다
                    받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나,
                    아니면 모든 쿠키를 거부할 수 있는 선택권을 가질 수 있습니다.
                </SubItem>
                <ThemeItem>Google에 오신 것을 환영합니다.</ThemeItem>
                <SubItem>
                    Google 제품 및 서비스(‘서비스’)를 이용해 주셔서 감사합니다.
                    서비스는 1600 Amphitheatre Parkway, Mountain View, CA 94043,
                    United States에 소재한 Google LLC(‘Google’)에서 제공합니다.
                    서비스를 이용함으로써 귀하는 본 약관에 동의하게 되므로 본
                    약관을 주의 깊게 읽어보시기 바랍니다. Google 서비스는 매우
                    다양하므로 때로 추가약관 또는 제품 요구사항(연령 요건
                    포함)이 적용될 수 있습니다. 추가약관은 관련 서비스에 대하여
                    제공되며, 귀하가 해당 서비스를 이용하는 경우 이 추가약관은
                    귀하와 Google 간 계약의 일부가 됩니다.
                </SubItem>
                <ThemeItem>Google 서비스 이용</ThemeItem>
                <SubItem>
                    귀하는 서비스 내에서 적용되는 모든 정책을 준수해야 합니다.
                    Google 서비스의 오용을 삼가시기 바랍니다. 예를 들어 서비스를
                    방해하거나 Google이 제공하는 인터페이스 및 안내사항 이외의
                    다른 방법을 사용하여 액세스를 시도하지 않아야 합니다. 귀하는
                    관련 수출 및 재수출 통제 법규 및 규정 등 오직 법률상
                    허용되는 범위에서만 Google 서비스를 이용할 수 있습니다.
                    귀하가 Google 약관이나 정책을 준수하지 않거나 Google이
                    부정행위 혐의를 조사하고 있는 경우, Google 서비스 제공이
                    일시 중지 또는 중단될 수 있습니다. Google 서비스를
                    사용한다고 해서 Google 서비스 또는 액세스하는 콘텐츠의
                    지적재산권을 소유하게 되는 것은 아닙니다. 콘텐츠
                    소유자로부터 허가를 받거나 달리 법률에 따라 허용되는 경우를
                    제외하고, Google 서비스의 콘텐츠를 사용할 수 없습니다. 본
                    약관은 귀하에게 Google 서비스에 사용된 브랜드나 로고를
                    사용할 권리를 부여하지 않습니다. Google 서비스에 또는 Google
                    서비스와 함께 게재된 어떠한 법적 고지도 삭제하거나 감추거나
                    변경하지 마십시오. Google 서비스는 Google이 소유하지 않은
                    일부 콘텐츠를 표시할 수 있습니다. 그러한 콘텐츠에 대해서는
                    제공한 주체가 단독으로 책임지게 됩니다. Google은 콘텐츠의
                    위법성 여부 또는 Google 정책 위반 여부를 결정하기 위해
                    검토할 수 있으며, 콘텐츠가 Google 정책 또는 법률에
                    위반된다고 합리적으로 판단하는 경우 이를 삭제하거나 게시를
                    거부할 수 있습니다. 그렇다고 반드시 콘텐츠를 검토한다는
                    의미는 아니므로, 콘텐츠를 검토할 것이라고 간주하지 마십시오.
                    서비스 이용과 관련하여 Google은 귀하에게 서비스 고지, 관리
                    메시지 및 기타 정보를 발송할 수 있습니다. 귀하는 메시지
                    수신을 거부할 수 있습니다. 일부 Google 서비스는 휴대기기에서
                    사용할 수 있습니다. 트래픽 또는 보안 관련 법규 준수를
                    방해하거나 막는 방식으로 서비스를 사용해서는 안 됩니다.
                </SubItem>
                <ThemeItem>귀하의 Google 계정</ThemeItem>
                <SubItem>
                    귀하가 Google 서비스를 이용하기 위해서는 Google 계정이
                    필요할 수 있습니다. 귀하가 Google 계정을 직접 만들 수도
                    있고, 고용주 또는 교육기관과 같은 관리자가 귀하에게 Google
                    계정을 배정할 수도 있습니다. 관리자가 배정한 Google 계정을
                    사용하고 있는 경우, 별도의 약관 또는 추가약관이 적용될 수
                    있으며 관리자가 귀하의 계정에 액세스하거나 계정을 해지할 수
                    있습니다. Google 계정을 보호하려면 비밀번호를 비공개로
                    유지하십시오. 귀하는 Google 계정에서 또는 Google 계정을 통해
                    이루어지는 활동에 대한 책임이 있습니다. 타사
                    애플리케이션에서 Google 계정 비밀번호를 재사용하지 마십시오.
                    귀하의 비밀번호나 Google 계정이 무단으로 사용되고 있음을
                    알게 되는 경우 다음 도움말을 참조하시기 바랍니다.
                </SubItem>
                <ThemeItem>개인정보 보호 및 저작권 보호</ThemeItem>
                <SubItem>
                    Google 개인정보처리방침은 귀하가 Google 서비스를 사용할 때
                    Google이 개인정보를 어떻게 취급하고 보호하는지에 대해
                    설명합니다. Google 서비스를 사용함으로써 귀하는 Google이
                    개인정보처리방침에 따라 귀하의 개인정보를 사용할 수 있음에
                    동의하게 됩니다. Google은 미국 디지털 밀레니엄 저작권법(US
                    Digital Millennium Copyright Act)에 규정된 절차에 따라
                    저작권침해를 주장하는 신고에 대응하고, 반복 침해자의 계정을
                    해지합니다. Google은 저작권자가 온라인상에서 자신의 지적
                    재산을 관리할 수 있도록 정보를 제공합니다. 누군가 귀하의
                    저작권을 침해하고 있다고 생각되어 Google에 통지하고자 하는
                    경우, Google 도움말 센터에서 신고서 제출 방법 및 저작권 침해
                    신고에 대한 Google 대응 정책 관련 정보를 확인하실 수
                    있습니다.
                </SubItem>
            </PrivacyBox>
        </PrivacyLayout>
    )
}

export default GooglePrivacy
