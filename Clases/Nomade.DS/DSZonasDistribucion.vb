Public Class DSZonasDistribucion

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    ''' <summary>
    ''' CREAR ZONA DE DISTRIBUCIÓN A CLIENTES
    ''' </summary>
    ''' <param name="p_CODIGO_AUX">CÓDIGO AUXILIAR (SE USA PARA CONECTAR CÓDIGOS EN CASO DE MIGRACIONES A OTRAS BD)</param>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE ESTABLECIMIENTO</param>
    ''' <param name="p_NOMBRE">NOMBRE DE LA ZONA</param>
    ''' <param name="p_DESC">DESCRIPCIÓN DE LA ZONA</param>
    ''' <param name="p_PIDM_VEND">VENDEDOR ASIGNADO PARA LA ZONA</param>
    ''' <param name="p_ESTADO_IND">ESTADO DE LA ZONA</param>
    ''' <param name="p_USUA_ID">USUARIO QUE CREA LA ZONA</param>
    ''' <returns>retorna OK cuando es correcta la operación</returns>
    ''' <remarks></remarks>
    Public Function crearZonasDistribucion(ByVal p_CODIGO_AUX As String, ByVal p_CTLG_CODE As String, _
                                           ByVal p_SCSL_CODE As String, ByVal p_NOMBRE As String, _
                                           ByVal p_DESC As String, ByVal p_PIDM_VEND As String, _
                                           ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As List(Of String)
        Dim resp As New List(Of String)

        Try

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_CREAR_ZONA_DISTRIBUCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_AUX", p_CODIGO_AUX, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_VEND", p_PIDM_VEND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            resp.Add(cmd.Parameters("@p_CODE").Value)
            resp.Add(cmd.Parameters("@p_RESP").Value)

        Catch ex As Exception
            resp.Add(ex.Message)
            resp.Add("ERROR")
        End Try

        Return resp

    End Function

    ''' <summary>
    ''' ACTUALIZA LOS DATOS DE UNA ZONA DE DISTRIBUCIÓN DETERMINADA
    ''' </summary>
    ''' <param name="p_CODE">CÓDIGO DE LA ZONA</param>
    ''' <param name="p_CODIGO_AUX">CODIGO AUXILIAR</param>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE ESTABLECIMIENTO</param>
    ''' <param name="p_NOMBRE">NOMBRE DE LA ZONA</param>
    ''' <param name="p_DESC">DESCRIPCIÓN DE LA ZONA</param>
    ''' <param name="p_PIDM_VEND">PIDM DE VENDEDOR</param>
    ''' <param name="p_ESTADO_IND">ESTADO DE LA ZONA</param>
    ''' <param name="p_USUA_ID">USUARIO QUE MODIFICA LOS DATOS DE LA ZONA</param>
    ''' <returns>retorna OK cuando es correcta la operación</returns>
    ''' <remarks></remarks>
    Public Function actualizarZonasDistribucion(ByVal p_CODE As String, ByVal p_CODIGO_AUX As String, _
                                                ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, _
                                                ByVal p_NOMBRE As String, ByVal p_DESC As String, _
                                                ByVal p_PIDM_VEND As String, ByVal p_ESTADO_IND As String, _
                                                ByVal p_USUA_ID As String) As List(Of String)
        Dim resp As New List(Of String)

        Try

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_ACTUALIZAR_ZONA_DISTRIBUCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_AUX", p_CODIGO_AUX, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE", p_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_DESC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_VEND", p_PIDM_VEND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            resp.Add(p_CODE)
            resp.Add(cmd.Parameters("@p_RESP").Value)

        Catch ex As Exception
            resp.Add(ex.Message)
            resp.Add("ERROR")
        End Try

        Return resp

    End Function

    ''' <summary>
    ''' LISTA ZONAS DE DISTRIBUCIÓN
    ''' </summary>
    ''' <param name="p_CODE">CÓDIGO DE ZONA DE DISTRIBUCIÓN</param>
    ''' <param name="p_CODIGO_AUX">CÓDIGO DE DISTRIBUCIÓN</param>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE ESTABLECIMIENTO</param>
    ''' <param name="p_ESTADO_IND">ESTADO DE LA ZONA</param>
    ''' <param name="p_PIDM_VEND">VENDEDOR ASIGNADO</param>
    ''' <param name="p_TIPO_IND">TIPO DE LISTADO A OBTENER (POR DEFECTO:1)</param>
    ''' <returns>retorna un DataTable con la data solicitada</returns>
    ''' <remarks></remarks>
    Public Function listarZonasDistribucion(ByVal p_CODE As String, ByVal p_CODIGO_AUX As String, _
                                            ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, _
                                            ByVal p_ESTADO_IND As String, ByVal p_PIDM_VEND As String, _
                                            ByVal p_TIPO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_LISTAR_ZONA_DISTRIBUCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO_AUX", p_CODIGO_AUX, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_VEND", p_PIDM_VEND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    ''' <summary>
    ''' ASIGNACIÓN DE ZONA DE DISTRIBUCIÓN A CLIENTES
    ''' </summary>
    ''' <param name="p_ZONA_CODE">CÓDIGO DE ZONA DE DISTRIBUCIÓN</param>
    ''' <param name="p_DIRECCIONES">CONCATENADO DE PIDM Y DIRECCIÓN (PIDM1,SEQ1|PIDM2,SEQ2|...)</param>
    ''' <param name="p_TIPO_IND">1:Asignar; 2:Desasignar</param>
    ''' <returns>retorna OK cuando es correcta la operación</returns>
    ''' <remarks></remarks>
    Public Function asignarZonaDistribucionAclientes(ByVal p_ZONA_CODE As String, ByVal p_DIRECCIONES As String, ByVal p_TIPO_IND As String) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_ASIGNAR_ZONA_CLIENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZONA_CODE", p_ZONA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DIRECCIONES", p_DIRECCIONES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@p_RESP").Value
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    ''' <summary>
    ''' LISTADO MULTIUSOS DE CLIENTES CON O SIN ZONAS DE DISTRIBUCIÓN
    ''' </summary>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE ESTABLECIMIENTO</param>
    ''' <param name="p_ZONA_CODE">CÓDIGO DE ZONA</param>
    ''' <param name="p_CLIE_PIDM">PIDM DE CLIENTE</param>
    ''' <param name="p_PIDM_VEND">PIDM DE VENDEDOR</param>
    ''' <param name="p_TIPO_IND">TIPO DE LISTADO A OBTENER (POR DEFECTO: 1)</param>
    ''' <returns>DataTable con data solicitada</returns>
    ''' <remarks></remarks>
    Public Function listarClientesXzonaDistribucion(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, _
                                                    ByVal p_ZONA_CODE As String, ByVal p_CLIE_PIDM As String, _
                                                    ByVal p_PIDM_VEND As String, ByVal p_TIPO_IND As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_LISTAR_DIRECCIONES_CLIENTES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ZONA_CODE", p_ZONA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIE_PIDM", p_CLIE_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_VEND", p_PIDM_VEND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    ''' <summary>
    ''' LISTADO DE VENDEDORES PARA EL MÓDULO DE DISTRIBUCIÓN
    ''' </summary>
    ''' <param name="p_CTLG_CODE">CÓDIGO DE EMPRESA</param>
    ''' <param name="p_SCSL_CODE">CÓDIGO DE ESTABLECIMIENTO</param>
    ''' <param name="p_PIDM_VEND">PIDM DE VENDEDOR</param>
    ''' <param name="p_TIPO_IND">TIPO DE LISTADO SOLICITADO</param>
    ''' <returns>Tabla de datos solicitado (si no hay datos retorna Nothing)</returns>
    ''' <remarks></remarks>
    Public Function listarVendedoresDistribucion(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String,
                                                 ByVal p_PIDM_VEND As String, ByVal p_TIPO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PDS_LISTAR_VENDEDOR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM_VEND", p_PIDM_VEND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
