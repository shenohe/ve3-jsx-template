import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, context) {
    const emailAddress = 'developer@hunyutech.com';
    const platformName = ref('Agent云平台')
    const openEmail = () => {
      window.location = `mailto:${emailAddress}`;
    };

    return () => {
      return (
        <div class="min-h-screen bg-white text-gray-800">
          <main class="container mx-auto px-6 pt-32 pb-20">
            <section class="mb-16 text-center">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                服务协议
              </h1>
            </section>
            
            <article class="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <p class="text-yellow-800 font-semibold">
                  【特别提示】本协议包含免除或限制责任的条款，请仔细阅读。如不同意，请立即停止使用服务。
                </p>
              </div>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">1、前言</h2>
                <p class="mb-4">感谢选择使用{platformName.value}及相关服务！</p>
                <p>
                  {platformName.value}及相关服务（以下简称"本服务"）是由杭州魂域科技有限公司（以下简称"本公司"或"我们"）通过网页、应用程序等多种形式提供的智能对话及其他相关服务。本服务以智能对话、内容创作、数据分析为核心功能，可根据您的需求提供信息检索、内容生成、数据分析等智能化服务。
                </p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">2、服务内容与规范</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">2.1 适用人群</h3>
                    <p>
                      本服务主要面向成年用户。如您未满18周岁，请在法定监护人的陪同下阅读本协议，并在获得监护人同意后使用本服务。{platformName.value}深知保护未成年用户的重要性，并将严格遵守相关法律法规，结合行业最佳实践，采取必要的保护措施。与此同时，我们也呼吁监护人积极履行监护职责，合理引导未成年人正确使用本服务，共同营造健康、安全的网络环境。通过科学管理和适当监督，帮助未成年人形成良好的上网习惯，避免过度依赖或沉迷于网络。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">2.2 服务说明</h3>
                    <p>
                      {platformName.value}是基于先进的人工智能技术开发的智能助手，可为您提供对话交互、信息检索、内容创作、数据分析等服务。请注意，{platformName.value}生成的内容仅供参考，不应作为专业建议使用。对于涉及医疗、法律、金融等专业领域的问题，请务必咨询相关领域的专业人士。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">2.3 健康咨询免责声明</h3>
                    <p>
                      {platformName.value}提供的健康相关咨询服务仅供参考，不构成医疗诊断或建议。任何健康相关的决定都应当在专业医生的指导下进行。我们不对因使用该服务产生的任何后果承担责任。涉及法律、金融、教育等专业领域的内容，均不构成专业意见。用户需自行验证信息准确性，并承担因依赖本服务内容导致的决策风险。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">3、用户账号规范</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">3.1 账号注册</h3>
                    <p class="mb-4">
                      您可以通过手机号注册获得{platformName.value}的账号。您的手机号和验证码是您使用本服务的身份凭证。
                    </p>
                    <p class="mb-4">
                      您设置的账号名不得违反国家法律法规、公序良俗、社会公德、我们的管理规范或容易引起您与我们身份的混淆，否则您的账号可能不能注册成功或我们有权主动予以修改或注销账号。
                    </p>
                    <p class="mb-4">
                      您需按照要求提供真实、准确、合法且有效的相关信息，并确认已阅读并同意本协议及其他相关规则和政策。如您提交的信息存在虚假、不准确、不完整或其他不符合规范之处，或者我们有合理理由怀疑您提供的信息不实、不合法，我们有权拒绝向您提供相关功能或服务。由此可能导致您无法正常使用本软件及相关服务，或部分功能受到限制。
                    </p>
                    <p>
                      请妥善保管您的账号信息，因其是您访问和使用本服务的重要凭证。该账号仅限您本人使用，不得转让、赠与或继承。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">3.2 账号安全</h3>
                    <p class="mb-4">
                      您有责任妥善保管个人账号、密码及验证码，并确保其安全性与保密性。您需对以您的账号名义进行的所有操作和行为承担全部法律责任，包括但不限于在本软件及相关服务中进行的数据修改、言论发布、支付交易等可能产生的法律后果。请务必高度重视账号、密码及验证码的保护，避免在任何情况下将其泄露给他人。
                    </p>
                    <p class="mb-4">
                      若您因账号丢失、密码遗忘或验证码泄露而无法正常使用，可向公司提交申诉请求找回。您需理解并同意，公司在验证申诉信息时，仅会比对申诉资料与系统记录的一致性，但无法完全确认申诉人是否为账号的实际持有人。因此，请您妥善保管账号、密码及验证码，并在使用完毕后确保安全退出。如因您保管不当导致账号被盗、密码丢失或验证码泄露，您需自行承担由此产生的相关责任。
                    </p>
                    <p class="mb-4">
                      不得冒用他人名义注册账号或使用本服务，也不得通过频繁注册、批量注册等方式恶意创建账号。如您发现账号被非法使用或存在其他安全问题，请立即通知我们，我们将尽力协助您处理相关问题。
                    </p>
                    <p>
                      平台将采取符合网络安全等级保护标准的安全措施（包括但不限于AES-256加密存储、TLS 1.3传输加密、最小权限访问控制），严格保护用户账号及个人信息。若因用户未妥善管理密码、主动共享账号或未在48小时内报告异常登录导致的泄露，平台可免责；未经用户单独同意（法律要求或紧急安全事件除外），不会向无关第三方披露数据，确需共享时将通过脱敏处理并约束第三方履行同等安全义务。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">3.3 账号注销</h3>
                    <p class="mb-4">
                      您可随时注销您的账号，注销后，您的账号数据将无法恢复。请理解，即使您已注销账号，仍需对您在使用本软件及相关服务期间的行为承担相应的法律责任。
                    </p>
                    <p>
                      如您需要注销账号，可以按照相应流程申请。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">4、用户行为规范</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">4.1 您在使用本服务时应当遵守法律法规，不得实施以下行为：</h3>
                    <ul class="list-disc list-inside space-y-2 ml-4">
                      <li>危害国家安全、泄露国家秘密</li>
                      <li>散布虚假信息、破坏社会秩序</li>
                      <li>侵犯他人知识产权、隐私权等合法权益</li>
                      <li>传播违法、暴力、色情等有害信息</li>
                      <li>进行网络攻击或破坏系统安全的行为</li>
                      <li>其他违反法律法规的行为</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">4.2 信息内容规范</h3>
                    <ul class="list-disc list-inside space-y-2 ml-4 mb-4">
                      <li>遵守法律法规和社会公德</li>
                      <li>尊重他人合法权益</li>
                      <li>不含虚假、误导性内容</li>
                      <li>不侵犯他人知识产权</li>
                      <li>不违反公序良俗</li>
                    </ul>
                    
                    <p class="mb-4">
                      为履行法律规定的义务，{platformName.value}有权采取技术措施对用户使用本服务的行为和信息进行必要的审查，包括但不限于监测用户的输入与输出内容、建立风险过滤机制以及构建违法内容特征库等。作为本服务的用户，您不得以任何形式恶意规避或干扰本服务的内容安全管理和风险防控机制，包括但不限于以下行为：
                    </p>
                    
                    <ul class="list-disc list-inside space-y-2 ml-4">
                      <li><strong>规避检测：</strong>通过变形、乱码、特殊字符、谐音等方式试图绕过服务检测机制，输入或生成违反上述条款的内容。</li>
                      <li><strong>恶意干扰：</strong>利用假冒身份、反向诱导、越狱攻击等手段对服务系统进行干扰、攻击或恶意投毒。</li>
                      <li><strong>篡改标识：</strong>未经授权或未基于合法理由，擅自删除、修改本服务生成内容中附带的标识信息。</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">5、知识产权</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">5.1 用户内容</h3>
                    <p>
                      您通过{platformName.value}提供的输入内容的知识产权归您所有。对于系统生成的输出内容，您可以在遵守本协议的前提下使用。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">5.2 平台知识产权</h3>
                    <p class="mb-4">
                      {platformName.value}的软件、技术、程序等相关知识产权归本公司所有。未经许可，不得对{platformName.value}进行复制、修改、传播等行为。
                    </p>
                    <p>
                      您理解并同意，您在使用本服务时所输入的内容不得侵犯任何人的合法权益，包括但不限于知识产权、肖像权、名誉权、荣誉权、姓名权、隐私权及个人信息权益等；您对生成内容的使用不得违反法律法规及公序良俗。同时，您的输入不得涉及国家秘密、商业秘密、重要数据或其他可能危害国家安全或公共利益的内容。如因您的行为导致侵权或其他违法后果，相关风险与责任均由您自行承担。若因此给本公司造成任何直接或间接损失（包括但不限于经济损失、商誉损害、维权费用及律师费等），您需全额赔偿。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">6、服务变更与终止</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">6.1 服务保障</h3>
                    <p>
                      我们会持续改进服务质量，但不保证服务不会中断或出现技术问题。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">6.2 服务终止</h3>
                    <p>
                      如您违反本协议，我们有权暂停或终止向您提供服务。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">7、免责声明</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.1 我们不对以下情况承担责任</h3>
                    <ul class="list-disc list-inside space-y-2 ml-4">
                      <li>因不可抗力导致的服务中断</li>
                      <li>因用户使用不当造成的损失</li>
                      <li>第三方通过技术手段造成的损害</li>
                      <li>用户因使用本服务产生的间接损失</li>
                    </ul>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.2 服务影响与不保证条款</h3>
                    <p class="mb-4">
                      您理解并同意，本软件及相关服务可能会受到多种因素的影响或干扰，公司无法保证以下事项：
                    </p>
                    <ul class="list-disc list-inside space-y-2 ml-4 mb-4">
                      <li>本软件及相关服务完全满足您的使用需求；</li>
                      <li>本软件及相关服务始终不受干扰，能够及时、安全、可靠运行，或不存在任何错误；</li>
                      <li>您通过本软件及相关服务获得的任何信息、服务或其他内容完全符合您的期望；</li>
                      <li>本软件及相关服务中的任何缺陷或错误都能得到修复。</li>
                    </ul>
                    <p>
                      本服务基于"现状"和"当前功能"提供，公司将尽最大努力保障服务的安全性和稳定性，但在现有技术水平下无法完全避免可能的缺陷或问题。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.3 用户内容与风险承担</h3>
                    <p>
                      您理解并承诺，在使用本服务时，您需对所输入的内容自行负责，包括但不限于判断其合法性、真实性、准确性和完整性。您应对使用本服务过程中产生的行为和后果自行承担责任。若因您的输入或行为导致任何侵权、违法或其他风险，相关责任由您自行承担。公司对因上述原因导致的任何直接或间接损失免责，除非法律另有明确规定。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.4 不可抗力与意外事件</h3>
                    <p>
                      您理解并同意，在使用本软件及相关服务过程中，可能会因不可抗力（如自然灾害、战争、政府行为、政策调整、网络管制、罢工、骚乱等）或意外事件（如计算机病毒、网络通讯故障、系统维护等）导致服务中断、暂停或终止。对于因此造成的任何损失，公司在法律法规允许的范围内免于承担责任。公司将尽力在第一时间处理并恢复服务，但无法完全避免因不可抗力导致的后果。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.5 人工智能技术局限性</h3>
                    <p class="mb-4">
                      您理解并同意，人工智能和机器学习是快速发展的技术领域，公司持续改进本服务以提升其准确性、可靠性和安全性。然而，由于技术局限性，公司无法完全保证通过本服务生成的输出内容的合法性、真实性、准确性或完整性。您需对本服务输出的内容自行判断，并承担因使用内容所引发的所有风险。公司对此类风险导致的任何损失或损害免责，除非法律另有明确规定。
                    </p>
                    <p>
                      本服务的输出不构成专业意见，不能替代法律、医疗、金融等领域的专业建议。相关观点仅基于算法处理有限数据得出的参考结果，可能存在差异。您应科学理性地使用本服务，并对基于输出内容作出的决策或行为承担全部责任。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.6 测试功能与服务稳定性</h3>
                    <p>
                      公司可能会不时推出新的功能或服务，这些功能可能处于测试阶段。在测试期间，服务可能存在不稳定或其他问题。除法律另有明确规定外，公司不对测试功能的稳定性或可靠性作出任何保证。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.7 责任限制</h3>
                    <p>
                      在任何情况下，即使公司已被告知可能存在损害，公司及其关联方或许可方均不对因使用本服务而导致的任何直接、间接、附带、特殊、后果性或惩罚性损害承担责任，包括但不限于利润损失、商誉损失、数据丢失或其他无形损失。除法律法规另有明确规定外，公司对您承担的全部责任总额不超过您在使用本服务期间支付的费用（如有）。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">7.8 违法违规内容处理</h3>
                    <p>
                      公司依据本协议约定，有权处理违法违规内容，但此权利不构成公司的义务或承诺。公司不保证能及时发现所有违法行为或进行相应处理。如因此产生的后果，您需自行承担责任。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">8、协议变更</h2>
                <p>
                  您同意并接受我们有权随时修改本协议的任何条款。修改后的协议一经公布即替代原协议条款，建议您自行前往官方网站查看最新版本的协议内容。如您不同意修改后的协议，请立即停止使用本服务；若您继续使用本服务，则视为您已同意并接受修改后的协议。
                </p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">9、投诉、申诉处理</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">9.1 投诉</h3>
                    <p>
                      如果您认为本服务存在侵犯您的知识产权或其他合法权益的情形，或者注意到任何违法、虚假信息或违反本协议的使用行为，您可以将相关投诉材料发送至邮箱：<span class="text-blue-600 cursor-pointer underline hover:text-blue-700" onClick={openEmail}>{emailAddress}</span>。我们将在收到您的投诉后进行审核，并根据情况采取适当的措施，包括但不限于停止内容生成、终止传输或删除相关内容等，以及时处理您的投诉。
                    </p>
                  </div>

                  <div>
                    <h3 class="text-xl font-semibold text-gray-800 mb-3">9.2 申诉</h3>
                    <p class="mb-4">
                      如果您认为我们对您使用本服务的限制存在不当，您可通过邮箱：<span class="text-blue-600 cursor-pointer underline hover:text-blue-700" onClick={openEmail}>{emailAddress}</span> 提交申诉。申诉材料应包含必要的信息，以便我们核实您的身份和相关情况，并明确说明限制情况及您的申诉请求。我们将在收到申诉后会及时跟进处理。申诉结果将通过邮件通知您。
                    </p>
                    <p>
                      我们将在收到您的投诉或申诉后15个工作日内，或在法律规定的期限内，向您反馈处理结果。
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">10、法律适用与争议解决</h2>
                <p>
                  本协议的订立、执行和解释及争议的解决均应适用中华人民共和国大陆地区法律。如发生争议，双方应友好协商解决；协商不成的，任何一方均可向本协议签订地有管辖权的人民法院提起诉讼。
                </p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">11、联系我们</h2>
                <p class="mb-4">
                  如对本协议有任何疑问，可通过电子邮件联系我们：<span class="text-blue-600 cursor-pointer underline hover:text-blue-700" onClick={openEmail}>{emailAddress}</span>
                </p>
                <p class="text-sm text-gray-500">
                  本协议最终解释权归杭州魂域科技有限公司所有。
                </p>
              </section>
            </article>
          </main>
        </div>
      );
    };
  }
});
