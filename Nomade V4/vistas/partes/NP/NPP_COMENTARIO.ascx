<%@ Control Language="VB" AutoEventWireup="false" CodeFile="NPP_COMENTARIO.ascx.vb" Inherits="vistas_partes_NP_NPP_COMENTARIO" %>
 <table width="900" border="0" cellspacing="0" cellpadding="1">
    <tr>
    <td>Sequencia</td>
    <td>
        <asp:TextBox runat="server" Width="15px" ID="TextBox8"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>Tipo de Comentario</td>
    <td>
        <asp:DropDownList ID="dd_tipo" runat="server" Width="120px" 
            AutoPostBack="True">
        </asp:DropDownList>
    </td>
  </tr>
  <tr>
    <td>Comentario</td>
    <td>
        <asp:TextBox runat="server" Width="407px" ID="TextBox9" Height="87px" 
            TextMode="MultiLine"></asp:TextBox>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        &nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        <asp:Button ID="Button5" runat="server" Text="Grabar" CssClass="boton" />
            </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>
        &nbsp;</td>
  </tr>
</table>